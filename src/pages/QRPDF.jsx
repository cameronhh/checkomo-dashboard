import React, { createRef } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Button,
  Heading,
  Paragraph,
} from "grommet";

import ReactToPdf from "react-to-pdf";
import QRCode from "qrcode.react";

import { pdfText } from "../config/pdfs";


const options = {
  orientation: 'portrait',
  format: 'A4'
};

const ref = createRef();

const QRPDF = () => {
  document.title = "QR Codes | Checkomo";

  const urlParams = useParams();

  const checkInUrl = `${process.env.REACT_APP_CHECKIN_BASE}/`
    + `${urlParams.venueId}/${urlParams.venueCode}`

  return (
    <Box fill background={{ light: "light-2", dark: "dark-2" }}>
      <Box
        flex
        responsive={false}
        align="center"
        overflow="scroll"
        gap="xsmall"
        pad="large"
      >
        <ReactToPdf
          targetRef={ref}
          filename={`Check-In-${urlParams.venueId}-${urlParams.venueCode}.pdf`}
          x={0}
          y={0}
          options={options}
        >
          {({ toPdf }) => (
            <Button primary onClick={toPdf} label="Download PDF" />
          )}
        </ReactToPdf>
        <Box
          ref={ref}
          responsive={false}
          flex={false}
          justify="center"
          align="center"
          border
          margin="large"
          background="white"
          width={{ min: "794px", max: "794px" }}
          height={{ min: "1123px", max: "1123px" }}
          hidden
        >
          <Heading textAlign="center" level="1">
            {pdfText.header}
          </Heading>
          <Paragraph textAlign="center" color="dark-4">
            {pdfText.subHeader}
          </Paragraph>
          <Box>
            {
              urlParams &&
              <QRCode
                value={checkInUrl}
                level="H"
                size={512}

              />
            }
          </Box>
          <Box align="center">
            <Heading
              textAlign="center"
              level="2"
            >
              {checkInUrl}
            </Heading>
            <Paragraph textAlign="center" color={"dark-4"}>
              {pdfText.byLine}
            </Paragraph>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default QRPDF;