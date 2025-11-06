import React from 'react';

export default function Footer() {
  return (
    <div style={{ textAlign: 'center', padding: 20, color: '#666', borderTop: '1px solid #eee' }}>
      © {new Date().getFullYear()} LocalFarm • Supporting Local Farmers 🌾
    </div>
  );
}
