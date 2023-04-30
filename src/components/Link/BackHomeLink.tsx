import { InternalLink } from './Link';

const BackHomeLink = () => {
  return (
    <InternalLink
      href='/'
      underline='none'
      color='text.primary'
      className='arrow arrow-left'
      fontSize={16}
      sx={{
        display: 'block',
        '&:hover': {
          color: 'primary.main'
        }
      }}
    >
      Home
    </InternalLink>
  );
};

export default BackHomeLink;
