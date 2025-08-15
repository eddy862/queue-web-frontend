import { useMediaQuery, useTheme } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type Props = {
    loading: boolean;
    images: { url: string; alt: string }[];
}

export default function VendorCarousel({ loading, images }: Props) {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Carousel
            showArrows={isSm ? true : false}
            showThumbs={false}
            showIndicators={isSm ? false : true}
            showStatus={isSm ? true : false}
            infiniteLoop={true}
            autoPlay={!loading}
            interval={5000}
            stopOnHover={true}
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
                            background: isSelected ? '#fff' : 'rgba(255,255,255,0.7)',
                            boxShadow: '0 0 4px 1px rgba(0,0,0,0.3)',
                            borderRadius: '50%',
                            width: '10px',
                            height: '10px',
                            margin: '0 7px',
                            padding: 0,
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                        aria-label={`Slide ${index + 1}`}
                    />
                );
            }}
        >
            {images.map((image, index) => (
                <div key={index} style={{ position: 'relative', height: isSm ? '180px' : isMd ? '250px' : '350px' }}>
                    {loading ? (
                        <div
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                width: '100%',
                                height: isSm ? '180px' : isMd ? '250px' : '350px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                        </div>
                    ) : (
                        <>
                            <img
                                src={image.url}
                                alt={image.alt}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            {/* Black fade overlay from bottom */}
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    top: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 70%)'
                                }}
                            />
                        </>
                    )}
                </div>
            ))}
        </Carousel>
    )
}