import { Box, styled } from '@mui/material';

export const LoadersRoot = styled(Box)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: theme.zIndex.modal
}));
