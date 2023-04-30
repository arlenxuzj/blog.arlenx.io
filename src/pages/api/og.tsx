import { NextRequest } from 'next/server';

import { ImageResponse } from '@vercel/og';

import siteMeta from '@/configs/siteMeta';

export const config = {
  runtime: 'edge'
};

const font = fetch(
  new URL('../../assets/Inter-Bold.ttf', import.meta.url)
).then(res => res.arrayBuffer());

const darkTextColor = 'hsl(239, 84%, 95%)';
const lightTextColor = 'hsl(239, 84%, 10%);';

const backgroundType = {
  default: { backgroundColor: 'hsl(223, 15%, 10%)', textColor: darkTextColor },
  '1': {
    backgroundColor:
      'linear-gradient(135deg, rgb(101, 78, 163), rgb(218, 152, 180))',
    textColor: lightTextColor
  },
  '2': {
    backgroundColor:
      'linear-gradient(135deg, rgb(255, 117, 181), rgb(255, 184, 108))',
    textColor: lightTextColor
  },
  '3': {
    backgroundColor:
      'linear-gradient(135deg, rgb(246, 211, 101), rgb(253, 160, 133))',
    textColor: lightTextColor
  },
  '4': {
    backgroundColor:
      'linear-gradient(135deg, rgb(132, 250, 176), rgb(143, 211, 244))',
    textColor: lightTextColor
  },
  '5': {
    backgroundColor:
      'linear-gradient(135deg, rgb(213, 126, 235), rgb(252, 203, 144))',
    textColor: lightTextColor
  },
  '6': {
    backgroundColor:
      'linear-gradient(135deg, rgb(249, 116, 143), rgb(254, 154, 139))',
    textColor: lightTextColor
  }
};

const handler = async (req: NextRequest) => {
  try {
    const fontData = await font;

    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')!.length < 80
        ? searchParams.get('title')!
        : searchParams.get('title')!.slice(0, 80) + '...'
      : null;

    if (!title) {
      return new ImageResponse(
        (
          <div
            style={{
              fontFamily: 'Inter',
              color: backgroundType.default.textColor,
              background: backgroundType.default.backgroundColor,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center'
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='128px'
              height='128px'
              fill={darkTextColor}
              viewBox='0 0 32 32'
            >
              <path d='m.34.31C.15.48,0,.75,0,.9,0,1.25,22.54,31.24,23.13,31.68c.34.26.56.3,1.76.3,1.05,0,1.42-.05,1.62-.21.22-.2.22-.25-.05-.63C25.04,29.13,3.43.54,3.14.3,2.83.06,2.6.01,1.72.01c-.9,0-1.1.04-1.38.3Z' />
              <path d='m5.86.22c-.15.16-.15.26-.03.45,3.49,4.75,23.22,30.82,23.48,31.02.56.43,1.79.42,2.3-.03.22-.17.39-.43.39-.59C32,30.77,9.28.44,8.86.17c-.4-.25-2.74-.21-3,.05Z' />
              <path d='m22.99.3c-.66.58-5.67,7.42-5.67,7.75,0,.47,1.39,2.16,1.78,2.16.23,0,1.16-1.12,3.9-4.74,1.98-2.61,3.59-4.83,3.6-4.93,0-.42-.36-.53-1.81-.53-1.3,0-1.49.03-1.79.29Z' />
              <path d='m29.34.17c-.31.21-8.61,11.21-8.83,11.7-.2.42.03.95.6,1.49.32.29.51.34.96.32l.57-.04,4.68-6.25c2.57-3.43,4.67-6.36,4.67-6.49s-.17-.38-.39-.55c-.29-.26-.53-.33-1.21-.33-.45,0-.93.08-1.07.16Z' />
              <path d='m9.6,18.34c-.43.18-9.6,12.33-9.6,12.71,0,.13.12.38.29.55.23.25.46.32,1.27.34.62.04,1.11-.01,1.34-.12.5-.25,8.84-11.38,8.84-11.8,0-.35-.97-1.72-1.22-1.72-.08,0-.23-.03-.36-.07-.11-.04-.37.01-.57.1Z' />
              <path d='m12.86,22.08c-.32.24-7.14,9.21-7.14,9.4,0,.05.11.2.25.3.25.21,1.92.29,2.66.13.43-.11,6.06-7.5,6.06-7.97,0-.25-1.27-2.08-1.45-2.08-.03,0-.2.1-.37.22Z' />
            </svg>
          </div>
        ),
        {
          width: 1200,
          height: 630
        }
      );
    }

    const hasBackgroundType = searchParams.has('backgroundType');
    const targetBackgroundType = hasBackgroundType
      ? backgroundType[
          searchParams.get('backgroundType')! as keyof typeof backgroundType
        ] || backgroundType.default
      : backgroundType.default;

    return new ImageResponse(
      (
        <div
          style={{
            fontFamily: 'Inter',
            fontWeight: 700,
            color: targetBackgroundType.textColor,
            background: targetBackgroundType.backgroundColor,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: '70%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                fontSize: 64
              }}
            >
              {title}
            </div>
          </div>
          <div
            style={{
              width: '75%',
              position: 'absolute',
              display: 'flex',
              flexDirection: 'row',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
              bottom: 72,
              fontSize: 32
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='48px'
              height='48px'
              fill={targetBackgroundType.textColor}
              viewBox='0 0 32 32'
            >
              <path d='m.34.31C.15.48,0,.75,0,.9,0,1.25,22.54,31.24,23.13,31.68c.34.26.56.3,1.76.3,1.05,0,1.42-.05,1.62-.21.22-.2.22-.25-.05-.63C25.04,29.13,3.43.54,3.14.3,2.83.06,2.6.01,1.72.01c-.9,0-1.1.04-1.38.3Z' />
              <path d='m5.86.22c-.15.16-.15.26-.03.45,3.49,4.75,23.22,30.82,23.48,31.02.56.43,1.79.42,2.3-.03.22-.17.39-.43.39-.59C32,30.77,9.28.44,8.86.17c-.4-.25-2.74-.21-3,.05Z' />
              <path d='m22.99.3c-.66.58-5.67,7.42-5.67,7.75,0,.47,1.39,2.16,1.78,2.16.23,0,1.16-1.12,3.9-4.74,1.98-2.61,3.59-4.83,3.6-4.93,0-.42-.36-.53-1.81-.53-1.3,0-1.49.03-1.79.29Z' />
              <path d='m29.34.17c-.31.21-8.61,11.21-8.83,11.7-.2.42.03.95.6,1.49.32.29.51.34.96.32l.57-.04,4.68-6.25c2.57-3.43,4.67-6.36,4.67-6.49s-.17-.38-.39-.55c-.29-.26-.53-.33-1.21-.33-.45,0-.93.08-1.07.16Z' />
              <path d='m9.6,18.34c-.43.18-9.6,12.33-9.6,12.71,0,.13.12.38.29.55.23.25.46.32,1.27.34.62.04,1.11-.01,1.34-.12.5-.25,8.84-11.38,8.84-11.8,0-.35-.97-1.72-1.22-1.72-.08,0-.23-.03-.36-.07-.11-.04-.37.01-.57.1Z' />
              <path d='m12.86,22.08c-.32.24-7.14,9.21-7.14,9.4,0,.05.11.2.25.3.25.21,1.92.29,2.66.13.43-.11,6.06-7.5,6.06-7.97,0-.25-1.27-2.08-1.45-2.08-.03,0-.2.1-.37.22Z' />
            </svg>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                textAlign: 'center',
                alignItems: 'center',
                columnGap: '4px'
              }}
            >
              <div
                style={{
                  marginTop: '-4px'
                }}
              >
                {'@'}
              </div>
              <div>{siteMeta.author}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 700
          }
        ]
      }
    );
  } catch (e: unknown) {
    console.log(`${(e as Error).message}`);
    return new Response(`Failed to generate the image`, {
      status: 500
    });
  }
};

export default handler;
