import { InternalLink } from './Link';

const BackHomeLink = () => {
  return (
    <InternalLink
      href='/'
      underline='none'
      className='arrow arrow-left'
      sx={{
        color: 'text.primary',
        fontSize: 16,
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
