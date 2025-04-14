'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useRouter } from 'next/navigation';

const socket = io("http://localhost:8888", {
    transports: ["websocket"], 
    timeout: 5000, 
  });

const Page = () => {
    const [htmlResponse, setHtmlResponse] = useState('Đang xác minh tài khoản...');
    const router = useRouter()
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
      
        if (!token) {
          setHtmlResponse("<h2 style='color:red'>Thiếu mã xác minh trong đường dẫn.</h2>");
          return;
        }
      
        // Kiểm tra khi socket kết nối
        socket.on('connect', () => {
          const socketId = socket.id;
          console.log('✅ Socket connected with ID:', socketId);
      
          // Gửi request sau khi socket sẵn sàng
          axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, {
              token,
              socketId,
            })
            .then((res) => {
                console.log(res);                
              setHtmlResponse(res.data.message);
              if (res.status === 201) {
                setTimeout(() => {
                  router.push('/');
                }, 2000);
              }
            })
            .catch((err) => {
              if (err.response) {
                setHtmlResponse(err.response.data);
              } else {
                setHtmlResponse("<h2 style='color:red'>Lỗi kết nối tới máy chủ.</h2>");
              }
            });
        });
      
        // ✅ Có thể thêm xử lý khi lỗi kết nối
        socket.on('connect_error', (err) => {
          console.error('❌ Lỗi kết nối socket:', err);
          setHtmlResponse("<h2 style='color:red'>Không thể kết nối socket.io</h2>");
        });
      
      }, [router]);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: htmlResponse }}
            style={{ padding: '40px', textAlign: 'center' }}
        />
    );
};

export default Page;
