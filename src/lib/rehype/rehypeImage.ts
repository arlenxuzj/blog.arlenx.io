import { Node } from 'unist';
import { visit, type Visitor, type VisitorResult } from 'unist-util-visit';
import { VFile } from 'vfile';

import { DEFAULT_CONTENT_WIDTH, POST_CONTENT_WIDTH } from '../../constants';
import { getLocalImageSize, getRemoteImageSize } from '../../utils/image';
import { verifyUrl } from '../../utils/url';

const getMaxWidth = (sourceFilePath: string) => {
  if (sourceFilePath.startsWith('pages')) {
    return DEFAULT_CONTENT_WIDTH;
  } else {
    return POST_CONTENT_WIDTH;
  }
};

const rehypeImage = () => async (tree: Node, file: VFile) => {
  const promises: Promise<unknown>[] = [];
  const visitor: Visitor = (node, index, parent): VisitorResult => {
    // @ts-ignore
    if (!parent || node.tagName !== 'img') {
      return;
    }

    const img = node;

    // @ts-ignore
    const { src, alt = '' } = img.properties as { src?: string; alt?: string };

    if (!src) {
      return;
    }

    const [parsedAlt, renderedWidth] = alt.includes('|')
      ? alt.split('|').map(i => i.trim())
      : [alt.trim(), undefined];

    const isExternal = verifyUrl(src);

    if (isExternal) {
      const promise = getRemoteImageSize(src).then(imageSize => {
        // @ts-ignore
        img.properties = {
          // @ts-ignore
          ...img.properties,
          originWidth: imageSize.width,
          originHeight: imageSize.height,
          originRatio:
            imageSize.width && imageSize.height
              ? (imageSize.width / imageSize.height).toFixed(2)
              : 1,
          renderedWidth,
          maxRenderWidth: getMaxWidth(
            // @ts-ignore
            file.data.rawDocumentData.sourceFilePath
          ),
          alt: parsedAlt
        };
      });
      promises.push(promise);
    } else {
      let imagePath = src;
      if (!src.includes('/')) {
        // @ts-ignore
        imagePath = `/${file.data.rawDocumentData.flattenedPath}/images/${src}`;
      }

      const imageSize = getLocalImageSize(imagePath);

      // @ts-ignore
      img.properties = {
        // @ts-ignore
        ...img.properties,
        src: imagePath,
        originWidth: imageSize.width,
        originHeight: imageSize.height,
        originRatio:
          imageSize.width && imageSize.height
            ? (imageSize.width / imageSize.height).toFixed(2)
            : 1,
        renderedWidth,
        maxRenderWidth: getMaxWidth(
          // @ts-ignore
          file.data.rawDocumentData.sourceFilePath
        ),
        alt: parsedAlt
      };
    }
  };

  visit(tree, 'element', visitor);
  await Promise.all(promises);
};

export default rehypeImage;
