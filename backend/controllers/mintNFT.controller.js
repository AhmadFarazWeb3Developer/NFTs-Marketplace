import { PinataSDK } from "pinata";
import dotenv from "dotenv";

dotenv.config();

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});

const mintNFT = async (req, res) => {
  try {
    const { nftPrice } = req.body;
    const nftImage = req.file;

    // Log incoming file details for debugging
    console.log("Uploaded file details:", {
      mimetype: nftImage?.mimetype,
      size: nftImage?.size,
      originalname: nftImage?.originalname,
      bufferLength: nftImage?.buffer?.length,
    });

    if (!nftPrice) {
      return res.status(400).json({ error: "NFT price is required" });
    }
    if (!nftImage) {
      return res.status(400).json({ error: "NFT image is required" });
    }

    // Validate MIME type
    const allowedMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/webp",
    ];
    if (!allowedMimeTypes.includes(nftImage.mimetype)) {
      console.log("Invalid MIME type:", nftImage.mimetype);
      return res.status(400).json({
        error: `Unsupported file type. Allowed types: ${allowedMimeTypes.join(
          ", "
        )}`,
      });
    }

    // Generate presigned URL
    const signedUrl = await pinata.upload.public.createSignedURL({
      expires: 60,
      mimeTypes: allowedMimeTypes,
    });
    console.log("Presigned URL:", signedUrl);

    // Upload file to Pinata with correct headers
    const uploadResponse = await fetch(signedUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/offset+octet-stream",
        "Upload-Length": nftImage.size.toString(),
      },
      body: nftImage.buffer,
    });

    // Log response details
    const responseHeaders = Object.fromEntries(uploadResponse.headers);
    const responseBody = await uploadResponse.text(); // Get raw text response
    console.log("Pinata response:", {
      status: uploadResponse.status,
      statusText: uploadResponse.statusText,
      headers: responseHeaders,
      body: responseBody,
    });

    // Check if response is OK
    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.statusText}`);
    }

    // Try to parse JSON, handle non-JSON responses
    let result;
    try {
      result = JSON.parse(responseBody);
    } catch (error) {
      console.error("Failed to parse Pinata response as JSON:", error.message);
      // Check if response body is empty or non-JSON
      if (!responseBody) {
        // Extract CID from the presigned URL path (e.g., /v3/files/<fileId>)
        const fileId = signedUrl.match(/\/v3\/files\/([a-f0-9-]+)/)?.[1];
        if (fileId) {
          console.log("Assuming fileId as CID:", fileId);
          result = { cid: fileId }; // Use fileId as CID
        } else {
          throw new Error("No CID found in response or URL");
        }
      } else {
        throw new Error("Unexpected response format from Pinata");
      }
    }

    // Extract CID
    const cid = result.IpfsHash || result.cid;
    if (!cid) {
      throw new Error("CID not returned from Pinata");
    }
    const gatewayUrl = `${process.env.PINATA_GATEWAY}/ipfs/${cid}`;

    res.status(201).json({
      message: "NFT uploaded to IPFS successfully",
      data: {
        nftPrice,
        cid,
        gatewayUrl,
      },
    });
  } catch (error) {
    console.error("Error in mintNFT:", error);
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
};

export default mintNFT;
