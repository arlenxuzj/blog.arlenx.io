import { Stack, styled } from '@mui/material';

export const StyledMDXCodeBlock = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(5),
  border: '1px solid',
  borderColor: theme.vars.palette.border.color,
  borderRadius: theme.vars.shape['borderRadius-lg'],
  boxShadow: `0.5px 1px 1px ${theme.vars.palette.colors.shadow}`
}));

export const StyledMDXCodeBlockTitle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0, 3),
  minHeight: 50,
  borderBottom: '1px solid',
  borderColor: theme.vars.palette.border.color,
  borderTopLeftRadius: theme.vars.shape['borderRadius-lg'],
  borderTopRightRadius: theme.vars.shape['borderRadius-lg'],
  backgroundColor: theme.vars.palette.background['code-block']
})) as typeof Stack;

export const StyledMDXPre = styled('pre', {
  shouldForwardProp: prop => prop !== 'title'
})(({ theme, title }) => ({
  fontFamily: '"Fira Code", monospace',
  margin: 0,
  overflowX: 'auto',
  padding: theme.spacing(1, 0),
  borderTopLeftRadius: title ? undefined : theme.vars.shape['borderRadius-lg'],
  borderTopRightRadius: title ? undefined : theme.vars.shape['borderRadius-lg'],
  borderBottomLeftRadius: theme.vars.shape['borderRadius-lg'],
  borderBottomRightRadius: theme.vars.shape['borderRadius-lg'],
  backgroundColor: theme.vars.palette.background['code-block'],
  '& .code-highlight': {
    display: 'block'
  },
  '& .code-line': {
    display: 'block',
    lineHeight: '26px',
    /* Set placeholder for highlight accent border color to transparent */
    '&.inserted': {
      /* Set inserted line (+) color */
      backgroundColor: theme.vars.palette.success.emphasis,
      '& > span:first-of-type': {
        color: theme.vars.palette.success.dark
      },
      '&.line-number::before': {
        // borderLeft: `4px solid ${theme.vars.palette.success.main}`
        // borderLeft: `4px solid ${theme.vars.palette.background['inserted-code-line']}`
        backgroundColor: theme.vars.palette.background['inserted-code-line']
      }
    },
    '&.deleted': {
      /* Set deleted line (-) color */
      backgroundColor: theme.vars.palette.error.emphasis,
      '& > span:first-of-type': {
        color: theme.vars.palette.error.dark
      },
      '&.line-number::before': {
        // borderLeft: `4px solid ${theme.vars.palette.error.main}`
        // borderLeft: `4px solid ${theme.vars.palette.background['deleted-code-line']}`
        backgroundColor: theme.vars.palette.background['deleted-code-line']
      }
    },
    '&.highlight-line': {
      /* Set highlight bg color */
      backgroundColor: theme.vars.palette.primary.emphasis,
      '&.line-number::before': {
        // borderLeft: `4px solid ${theme.vars.palette.primary.main}`
        // borderLeft: `4px solid ${theme.vars.palette.background['highlight-code-line']}`
        backgroundColor: theme.vars.palette.background['highlight-code-line']
      }
    },
    '&.line-number::before': {
      display: 'inline-block',
      width: '48px',
      textAlign: 'right',
      paddingRight: '8px',
      marginRight: '8px',
      /* Line number color */
      color: theme.vars.palette.text.secondary,
      content: 'attr(line)'
    },
    '&:hover': {
      backgroundColor: theme.vars.palette.primary.emphasis
    },
    '&:not(.line-number)': {
      paddingLeft: theme.spacing(2)
    },
    '& .token.parameter,.token.plain,.token.comment,.token.prolog,.token.doctype,.token.cdata':
      {
        color: theme.vars.palette.tokens.comment
      },
    '& .token.punctuation': {
      color: theme.vars.palette.tokens.punctuation
    },
    '& .token.property,.token.tag,.token.boolean,.token.number,.token.constant,.token.symbol,.token.deleted':
      {
        color: theme.vars.palette.tokens.symbol
      },
    '& .token.selector,.token.attr-name,.token.char,.token.builtin,.token.inserted':
      {
        color: theme.vars.palette.tokens.selector
      },
    '& .token.operator,.token.entity,.token.url,.language-css .style': {
      color: theme.vars.palette.tokens.operator
    },
    '& .token.atrule,.token.attr-value,.token.keyword': {
      color: theme.vars.palette.tokens.keyword
    },
    '& .token.function,.token.maybe-class-name,.token.class-name,.token.imports':
      {
        color: theme.vars.palette.tokens.function
      },
    '& .token.regex,.token.important,.token.variable': {
      color: theme.vars.palette.tokens.operator
    }
  }
}));
