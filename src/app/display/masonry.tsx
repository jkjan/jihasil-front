'use client';
import Masonry from '@mui/lab/Masonry';
import * as React from 'react';
import { Box, Fade, Modal } from '@mui/material';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
};

export default function ImageMasonry() {
  const [open, setOpen] = React.useState(false);
  const [imageData, setImageData] = React.useState<string[]>([]);
  const [image, setImage] = React.useState('');
  const handleClose = () => setOpen(false);
  const handleImage = (value: string) => {
    setImage(value);
    setOpen(true);
  };

  // 비동기 함수 선언
  const fetchS3Keys = async () => {
    try {
      const response = await fetch('/api/fetchS3');

      if (response.ok) {
        const data: string[] = await response.json();
        setImageData(data);  // 응답 받은 데이터를 상태에 저장
      }
    } catch (err) {
    }
  };

  // useEffect 내에서 비동기 함수 호출
  useEffect(() => {
    fetchS3Keys();  // 컴포넌트가 마운트될 때 fetchS3Keys 호출
  }, []);  // 빈 배열을 의존성 배열로 사용하여 최초 렌더링 시 한 번만 호출

  return (
    <Masonry columns={{ xs: 3, sm: 4, md: 5 }} spacing={2}>
      {imageData.map((item: string, index: number) => (
        <div key={index}>
          <img
            onClick={() => handleImage(item)}
            srcSet={`${item}?w=162&auto=format&dpr=2 2x`}
            src={`${item}?w=162&auto=format`}
            alt={item}
            loading="lazy"
            style={{
              borderRadius: 4,
              display: 'block',
              width: '100%',
            }}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Fade in={open} timeout={500}>
                <img
                  srcSet={`${image}?w=162&auto=format&dpr=2 2x`}
                  src={`${image}?w=162&auto=format`}
                  alt={item}
                  loading="lazy"
                  style={{
                    display: 'block',
                    width: '100%',
                    border: '5px solid #fff', // 흰색 경계 추가
                    borderRadius: '8px', // 경계에 둥근 모서리 추가
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // 부드러운 그림자 효과 추가
                  }}
                />
              </Fade>
            </Box>
          </Modal>
        </div>
      ))}
    </Masonry>
  );
}


const itemDataDummy = [
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
    title: 'Snacks',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
    title: 'Tower',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
    title: 'Tree',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
    title: 'Camping Car',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
    title: 'Mountain',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];