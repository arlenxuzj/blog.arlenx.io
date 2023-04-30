import { styled } from '@mui/material';

export const StyledMDXCallout = styled('aside')(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(5),
  borderRadius: theme.vars.shape.borderRadius,
  '&.callout-note': {
    borderLeft: `4px solid ${theme.vars.palette.callout.note}`,
    '& .callout-indicator': {
      backgroundColor: `hsla(${theme.vars.palette.callout.noteChannel} / 0.1)`,
      '& .callout-icon': {
        color: theme.vars.palette.callout.note
      }
    }
  },
  '&.callout-info': {
    borderLeft: `4px solid ${theme.vars.palette.callout.info}`,
    '& .callout-indicator': {
      backgroundColor: `hsla(${theme.vars.palette.callout.infoChannel} / 0.1)`
    },
    '& .callout-icon': {
      color: theme.vars.palette.callout.info
    }
  },
  '&.callout-tip': {
    borderLeft: `4px solid ${theme.vars.palette.callout.tip}`,
    '& .callout-indicator': {
      backgroundColor: `hsla(${theme.vars.palette.callout.tipChannel} / 0.1)`
    },
    '& .callout-icon': {
      color: theme.vars.palette.callout.tip
    }
  },
  '&.callout-warning': {
    borderLeft: `4px solid ${theme.vars.palette.callout.warning}`,
    '& .callout-indicator': {
      backgroundColor: `hsla(${theme.vars.palette.callout.warningChannel} / 0.1)`
    },
    '& .callout-icon': {
      color: theme.vars.palette.callout.warning
    }
  },
  '& .callout-indicator': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    paddingLeft: theme.spacing(1.5),
    height: '48px',
    borderRight: `1px solid transparent`,
    borderTopRightRadius: theme.vars.shape.borderRadius,
    '& .callout-icon': {
      display: 'flex',
      alignSelf: 'center'
    },
    '& .callout-title': {
      fontSize: '18px',
      fontWeight: 700
    }
  },
  '& .callout-content': {
    padding: theme.spacing(3, 3),
    borderRight: `1px solid transparent`,
    borderBottomRightRadius: theme.vars.shape.borderRadius,
    backgroundColor: theme.vars.palette.background.callout,
    '& > :first-child': {
      marginTop: 0
    },
    '& > :last-child': {
      marginBottom: 0
    },
    '& p': {
      margin: theme.spacing(2, 0)
    }
  }
}));
