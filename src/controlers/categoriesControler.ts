import { Request, Response  } from "express";
import { Category  } from "../types/category";
import { prisma } from "../lib/db.js";

let category: Category  [] = [];

//1. menampilkan Event
export const getCategory = async (req: Request, res: Response) => {
    try {
        const allEvents = await prisma.category.findMany({
            orderBy: {
                createdAt:"desc"
            },
        });
        res.json(allEvents); 
    } catch (error) {
        res.status(500).json({
            message:"gagal ambil data event",
            error,
        });
    }
};

// menyimpan data event
export const saveCategory = async (req: Request, res: Response) => {
    const {name, createdAd} = req.body;
    
        // validasi sederhana
        if(!name) {
            res.status(500).json({message: "yaa erorr"})
        }
        //validasi berhsail
        const newCategory = await prisma.category.create({
            data:{
                name,
            },
        });
}

// menampilkan data category berdasrkan id
export const showCategoryById = (req: Request< {id :string} > , res: Response) => {
    const categoryId = parseInt(req.params.id, 10);
    const categoryData = category.findIndex((c) => c.id === categoryId);

    if (!categoryData) {
        res.status(404).json({ success: false, message : 'Category tidak ditemukan' });
        return;
    };

    res.status(200).json({ success: true, data: categoryData });
};

// mengupdate category berdasrkan id
export const updateCategoryById = (req: Request<{id: string}>, res: Response) => {
    const categoryId = parseInt(req.params.id, 10);
    const categoryIndex = category.findIndex((c) => c.id === categoryId);

    if (categoryIndex === -1) {
        res.status(404).json({ success: false, message: 'Category tidak ditemukan' });
        return;
    };

    const existingCategory = category[categoryIndex];

    if (!existingCategory) {
        res.status(404).json({ success: false, message: 'Category tidak valid' });
        return;
    };

    const { name } = req.body;
    if (!name){
        res.status(500).json({message: 'Nama harus diisi'});
        return;
    };

    const updateCategory : Category = {
        id: categoryId,
        name: name || existingCategory.name
    };

    category[categoryIndex] = updateCategory;
        res.status(200).json({ success : true, message: 'Category berhasil diupdate', data: updateCategory });
};

// menghapus category berdasarkan id
export const deleteCategoryById = (req: Request<{id: string}>, res: Response) => {
    const categoryId = parseInt(req.params.id, 10);
    const categoryIndex = category.findIndex((c) => c.id === categoryId);

    if (categoryIndex === -1) {
        res.status(404).json({ success: false, message : 'Category tidak ditemukan' });
        return;
    };

    category.splice(categoryIndex, 1);
    res.status(200).json({ success: true, message: 'Category berhasil dihapus' });  
};