import { TController } from "../../typings/controllers"
export const uploadPhotos: TController = async (req, res, next) => {
  console.log(req.files)
  console.log(req.body)
  res.json()
}
