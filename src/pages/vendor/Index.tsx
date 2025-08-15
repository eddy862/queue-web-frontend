import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import VendorCarousel from './VendorCarousel';
import CarouselOverlay from './CarouselOverlay';
import VendorDescOpening from './VendorDescOpening';
import QueueEntry from './QueueEntry';

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
  const [loading, setLoading] = useState(false);
  const [vendorName, setVendorName] = useState("KFC");
  const [rating, setRating] = useState(4.5); // 0 - 5
  const [open, setOpen] = useState(true);
  const [closeTime, setCloseTime] = useState("5pm");
  const [location, setLocation] = useState("123, Jalan KFC");
  const [description, setDescription] = useState("KFC is a global fast-food chain known for its fried chicken, burgers, and sides. Established in 1952, it has become a staple for quick meals and family dining. KFC offers a variety of menu items including chicken buckets, sandwiches, wraps, and desserts. The brand is recognized for its secret blend of 11 herbs and spices that gives its chicken a unique flavor. KFC also emphasizes community involvement and sustainability in its operations.");
  const [openingHours, setOpeningHours] = useState({
    monday: { open: "10am", close: "10pm" },
    tuesday: { open: "10am", close: "10pm" },
    wednesday: { open: "10am", close: "10pm" },
    thursday: { open: "10am", close: "10pm" },
    friday: { open: "10am", close: "11pm" },
    saturday: { open: "10am", close: "11pm" },
    sunday: { open: "10am", close: "10pm" },
  });
  const [openDesc, setOpenDesc] = useState(false);
  const [queueLength, setQueueLength] = useState(5);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (vendorId) {
      // api calls to fetch vendor data including name
      // setVendorName(response.vendorName);
    }
  }, [vendorId]);

  return (
    <Box className="vendor-page" sx={{ width: '100%', background: '#fafbfc' }}>
      {/* Top Section */}
      <Box sx={{ position: 'relative' }}>
        <VendorCarousel loading={loading} images={images} />

        {/* Vendor name overlay */}
        <CarouselOverlay
          vendorName={vendorName}
          rating={rating}
          open={open}
          closeTime={closeTime}
          location={location}
        />
      </Box>

      {/* Bottom Section */}
      <Box
        display="flex"
        alignItems={isSm ? "stretch" : "flex-start"}
        justifyContent="center"
        gap={isSm ? 2 : 4}
        pt={isSm ? 2 : 6}
        flexDirection={isSm ? "column-reverse" : "row"}
        sx={{
          width: '100%',
          px: isSm ? 1 : 0,
        }}
      >
        {/* Description and Opening Hours */}
        <VendorDescOpening
          vendorName={vendorName}
          description={description}
          openingHours={openingHours}
          openDesc={openDesc}
          setOpenDesc={setOpenDesc}
        />

        {/* Queue entry point */}
        <QueueEntry queueLength={queueLength} />
      </Box>
    </Box>
  );
}