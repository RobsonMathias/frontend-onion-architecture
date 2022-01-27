import React from 'react';
import { Card, CardContent, Grid, Skeleton } from '@mui/material';

export function LoadingComponent() {
  return (
    <>
      {Array.from({ length: 10 }, (v, k) => k).map((i) => (
        <Card key={i}>
          <CardContent>
            <Grid container justifyContent="space-between">
              <Skeleton width={300} />
              <Skeleton width={40} />
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
