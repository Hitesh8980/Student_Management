import React from 'react';
import { QRCodeSVG } from 'qrcode.react'; 

function QRCodeGenerator({ value }) {
  return <QRCodeSVG value={value} />;
}

export default QRCodeGenerator;
