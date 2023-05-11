export type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Posts',
    href: '/posts'
  },
  {
    label: 'Snippets',
    href: '/snippets'
  },
  {
    label: 'Tags',
    href: '/tags'
  },
  {
    label: 'Projects',
    href: '/projects'
  },
  {
    label: 'Resume',
    href: '/resume'
  },
  {
    label: 'About',
    href: '/about'
  }
];

export default navLinks;
