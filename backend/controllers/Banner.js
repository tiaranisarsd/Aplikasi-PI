import Banner from "../models/BannerModel.js";
import path from "path";
import fs from "fs";


export const getAllBanner = async (req, res) => {
    try {
        let response = await Banner.findAll({
            attributes: ['id', 'uuid', 'bannerName', 'imageBanner'],
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findOne({
            where: {
                uuid: req.params.id
            },
        });
        if (!banner) return res.status(404).json({ msg: "Data tidak ditemukan" });
        
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createBanner = async (req, res) => {
    try {
        const { bannerName } = req.body;
        const imageBanner = req.file ? req.file.filename : '';

        await Banner.create({
            bannerName: bannerName,
            imageBanner: imageBanner
        });

        res.status(201).json({ msg: "Banner Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findOne({
            where: {
                uuid: req.params.id
            }
        });

        if (!banner) {
            console.error("Data not found");
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        // Hapus file gambar dari folder uploads
        const imagePath = path.join(process.cwd(), 'banner', banner.imageBanner);
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Error deleting image ${banner.imageBanner}: ${err}`);
                } else {
                    console.log(`Deleted image ${banner.imageBanner}`);
                }
            });
        }

        await Banner.destroy({
            where: {
                uuid: req.params.id,
            }
        });

        res.status(200).json({ msg: "Banner deleted successfully" });
    } catch (error) {
        console.error("Error in deleteBanner:", error);
        res.status(500).json({ msg: error.message });
    }
};



export const updateBanner = async (req, res) => {
    const { bannerName } = req.body;
    let imageBanner;

    try {
        const banner = await Banner.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!banner) return res.status(404).json({ msg: "Data tidak ditemukan" });
        if (req.files && req.files.imageBanner) {
            const file = req.files.imageBanner;
            const fileName = Date.now() + '-' + file.name;
            const uploadPath = path.join(__dirname, '../uploads/banner', fileName);

            file.mv(uploadPath, async (err) => {
                if (err) return res.status(500).json({ message: err.message });

                // Delete old image if it exists
                if (banner.imageBanner) {
                    const oldImagePath = path.join(__dirname, '../uploads/banner', path.basename(banner.imageBanner));
                    fs.unlink(oldImagePath, (err) => {
                        if (err) console.error("Failed to delete old image:", err);
                    });
                }

                imageBanner = `http://localhost:5000/uploads/banner/${fileName}`;
                await banner.update({ bannerName, imageBanner });
                res.json(banner);
            });
        } else {
            await banner.update({ bannerName });
            res.json(banner);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
