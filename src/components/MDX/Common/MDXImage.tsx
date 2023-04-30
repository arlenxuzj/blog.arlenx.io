/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';

import Image from 'next/image';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal } from '@mui/material';

export type MDXImageProps = {
  src?: string;
  alt?: string;
  originWidth?: string;
  originHeight?: string;
  originRatio?: string;
  renderedWidth?: string;
  maxRenderWidth?: string;
  children?: React.ReactNode;
};

const MDXImage = (props: MDXImageProps) => {
  const { src, alt, renderedWidth, originWidth, maxRenderWidth, originRatio } =
    props;
  const [open, setOpen] = useState(false);

  if (!src) {
    return null;
  }

  let width = Number(maxRenderWidth);

  if (!renderedWidth) {
    if (originWidth && Number(originWidth) < Number(maxRenderWidth)) {
      width = Number(originWidth);
    }
  } else {
    if (Number(renderedWidth) < Number(maxRenderWidth)) {
      width = Number(renderedWidth);
    }
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          mb: 5,
          display: 'flex',
          justifyContent: 'center',
          cursor: 'zoom-in'
        }}
        onClick={handleClick}
      >
        <Image
          src={src}
          alt={alt || 'image'}
          width={width}
          height={Math.round(width / Number(originRatio))}
          style={{
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </Box>
      <Modal open={open} onClose={handleClose} disableAutoFocus>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            cursor: 'pointer'
          }}
          onClick={handleClose}
        >
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              width: '100%',
              top: 0,
              justifyContent: 'flex-end'
            }}
          >
            <Box
              sx={{
                p: 2
              }}
            >
              <CloseIcon fontSize='large' />
            </Box>
          </Box>
          <img
            src={src}
            alt={alt || 'image'}
            style={{
              maxWidth: '80vw',
              height: 'auto',
              maxHeight: '80vh',
              cursor: 'zoom-out'
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default MDXImage;
