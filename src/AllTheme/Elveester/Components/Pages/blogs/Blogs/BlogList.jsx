import React, { useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent 
} from '@mui/material';
import blogData from './BlogData';
import { useNavigate } from 'react-router-dom';
import blogBanner from './blogBanner.jpg';

export default function BlogListPage() {

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleMoveToDetail = (id) => {
        const url = `/blogs/${id}`;
        navigate(url);
    };
  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', pb: 8 }}>
      
     
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${blogBanner})`, // Replace with your luxury background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: { xs: 8, md: 12 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontFamily: '"Playfair Display", "Georgia", serif',
            fontWeight: 500,
            mb: 1,
            letterSpacing: '0.5px',
          }}
        >
          Jewellery Knowledge Center
        </Typography>
        
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 300,
            opacity: 0.9,
            mb: 4,
          }}
        >
          Expert jewellery guides and buying advice
        </Typography>

        
      </Box>

      {/* 2. Main Content Section */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 4,
            color: '#1a1a1a',
          }}
        >
          Latest Blogs
        </Typography>

        {/* Articles Grid */}
        <Grid container spacing={4}>
          {blogData.map((article) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
              <Card 
                elevation={0} 
                sx={{ 
                  bgcolor: 'transparent',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer'
                }}
                onClick={() => handleMoveToDetail(article.id)}
              >
                {/* Styled Round Corner Image */}
                <CardMedia
                  component="img"
                  height="240"
                  image={article.img}
                  alt={article.title}
                  sx={{ 
                    borderRadius: '16px', 
                    objectFit: 'cover' 
                  }}
                />
                
                <CardContent sx={{ px: 0, pt: 2, pb: 0, flexGrow: 1 }}>
                  {/* Article Title */}
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      lineHeight: 1.3,
                      mb: 1,
                      color: '#000000',
                    }}
                  >
                    {article.title}
                  </Typography>

                  {/* Article Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666666',
                      lineHeight: 1.5,
                      mb: 2,
                    }}
                  >
                    {article.category}
                  </Typography>

                  
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}