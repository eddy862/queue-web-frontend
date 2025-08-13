import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography, Box } from '@mui/material';
import { Star, StarHalf } from '@mui/icons-material';

type Props = {}

// Sample images for demonstration
const demoImages = [
  { url: 'https://picsum.dev/image/745/view', alt: 'Vendor Image 1' },
  { url: 'https://picsum.dev/image/746/view', alt: 'Vendor Image 2' },
  { url: 'https://picsum.dev/image/747/view', alt: 'Vendor Image 3' }
];

export default function Index({ }: Props) {
  const params = useParams();
  const vendorId = params.id;
  const [images, setImages] = useState(demoImages);
  const [loading, setLoading] = useState(true);
  const [vendorName, setVendorName] = useState("KFC");
  const [rating, setRating] = useState(4.5); // 0 - 5
  const [open, setOpen] = useState(true);
  const [closeTime, setCloseTime] = useState("5pm");

  useEffect(() => {
    if (vendorId) {
      // api calls to fetch vendor data including name
      // setVendorName(response.vendorName);
    }
  }, [vendorId]);

  return (
    <Box className="vendor-page">
      <Box style={{ position: 'relative' }}>
        <Carousel
          showArrows={false}
          showThumbs={false} /* Hide thumbnails */
          showIndicators={true} /* Show indicator dots */
          showStatus={false}
          infiniteLoop={true}
          autoPlay={!loading}
          interval={5000}
          stopOnHover={true}
          /* Custom styling for indicators */
          renderIndicator={(clickHandler, isSelected, index) => {
            return (
              <button
                type="button"
                onClick={clickHandler}
                onKeyDown={clickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                style={{
                  background: isSelected ? '#333' : '#ccc',
                  border: 'none',
                  borderRadius: '50%',
                  width: '10px',
                  height: '10px',
                  margin: '0 5px',
                  padding: 0,
                  cursor: 'pointer'
                }}
                aria-label={`Slide ${index + 1}`}
              />
            );
          }}
        >
          {images.map((image, index) => (
            <div key={index} style={{ height: '350px' }}> {/* Set a fixed height for each slide */}
              {loading ? (
                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    width: '100%',
                    height: '350px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                </div>
              ) : (
                <img src={image.url} alt={image.alt} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} />
              )}
            </div>
          ))}
        </Carousel>

        {/* Vendor name overlay */}
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '200px',
            color: 'white',
          }}
        >
          <Typography variant="h2" fontWeight={700}>{vendorName}</Typography>

          <Box display="flex" alignItems="center" gap={1}>
            {Array.from({ length: 5 }, (_, index) => {
              if (index < Math.floor(rating)) {
                return <Star key={index} style={{ color: 'gold' }} />;
              }
              if (index === Math.floor(rating) && !Number.isInteger(rating)) {
                return <StarHalf key={index} style={{ color: 'gold' }} />;
              }
              return <Star key={index} style={{ color: 'lightgray' }} />;
            })}

            <Typography variant="body1" ml={0.5} fontWeight={300}>
              {rating.toFixed(1)} / 5
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={4}>
            <Typography variant="body1" fontWeight={300} color={open ? "green" : "red"}>
              {open ? "Open now" : "Closed"}
            </Typography>

            {open && (
              <Typography variant="body1" fontWeight={300} color="white">
                Closes at {closeTime}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}