import React from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Assuming you're using this package for QR generation

function QRCodeGenerator({ value }) {
  return <QRCodeSVG value={value} />;
}

export default QRCodeGenerator;
