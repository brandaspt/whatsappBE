import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"

const photosStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: `JourneyLog/Photos/${req.user?._id}`,
    }
  },
})
export const photosParser = multer({ storage: photosStorage })

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: `WhatsAppUser/Avatars/${req.user?._id}`,
    }
  },
})
export const avatarParser = multer({ storage: avatarStorage })
