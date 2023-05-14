import fs from 'fs';
import path from 'path';

import axios from 'axios';
// @ts-ignore
import createBrowserless from 'browserless';
// @ts-ignore
import getHTML from 'html-get';
import createMetascraper from 'metascraper';
import metascraperDescription from 'metascraper-description';
import metascraperImage from 'metascraper-image';
import metascraperTitle from 'metascraper-title';
import metascraperUrl from 'metascraper-url';

type LinkPreview = {
  link: string;
  url: string;
  title: string;
  description: string;
  image: string;
  hostname: string;
  imageUrl: string;
};

const REFRESH = false;
const LINK_PREVIEW_FILE_PATH = path.resolve(
  __dirname,
  '../data/link-preview.json'
);
const LINK_PREVIEW_IMAGE_FOLDER_PATH = path.resolve(
  __dirname,
  '../public/images/link-preview'
);

const links = [
  'https://github.com/mui/material-ui/tree/master/examples/material-next-ts'
];

const linkPreview = fs.readFileSync(LINK_PREVIEW_FILE_PATH, 'utf8');
const linkPreviewJSON: LinkPreview[] = JSON.parse(linkPreview);

const browserless = createBrowserless();

const metascraper = createMetascraper([
  metascraperUrl(),
  metascraperTitle(),
  metascraperDescription(),
  metascraperImage()
]);

const downloadImage = async (
  url: string,
  folderPath: string,
  fileName: string
) => {
  const outputPath = path.resolve(folderPath, fileName);
  const writer = fs.createWriteStream(outputPath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

const main = async () => {
  const browserContext = await browserless.createContext();

  for (const link of links) {
    const linkPreview = linkPreviewJSON.find(
      linkPreview => linkPreview.link === link
    );

    if (!REFRESH && linkPreview) {
      console.log(`Skipping ${link}`);
      continue;
    }

    const { html, url } = await getHTML(link, {
      getBrowserless: () => browserContext
    });
    const metadata = await metascraper({ html, url });
    const metadataUrl = new URL(metadata.url);

    console.log(`Downloading ${metadata.image}`);
    const imageUrl = new URL(metadata.image);
    const imageFolderPath = Buffer.from(path.dirname(metadata.image)).toString(
      'base64'
    );
    const outputFolderPath = path.resolve(
      LINK_PREVIEW_IMAGE_FOLDER_PATH,
      imageFolderPath
    );
    const fileName = path.basename(imageUrl.pathname);
    const outputFileName =
      fileName.split('.').length === 1 ? `${fileName}.jpg` : fileName;

    if (!fs.existsSync(outputFolderPath)) {
      fs.mkdirSync(outputFolderPath, { recursive: true });
    }

    await downloadImage(metadata.image, outputFolderPath, outputFileName);

    linkPreviewJSON.push({
      ...metadata,
      hostname: metadataUrl.hostname,
      link,
      imageUrl: `/images/link-preview/${imageFolderPath}/${outputFileName}`
    });
  }

  await browserContext.destroyContext();
  await browserless.close();

  fs.writeFileSync(
    LINK_PREVIEW_FILE_PATH,
    JSON.stringify(linkPreviewJSON, null, 2)
  );

  process.exit(0);
};

main();
