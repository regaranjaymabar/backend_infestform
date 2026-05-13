import { Request, Response  } from "express";
import { Pembicara } from "../types/pembicara";



let pembicara: Pembicara[] = [];

// menampilkan Pembicara
export const getPembicara = (req: Request, res: Response) => {
    res.json(pembicara);
};

// menyimpan data Pembicara
export const savePembicara = (req: Request, res: Response) => {
    const {id, name, role, foto} = req.body;

    // validasi error
    if(!id || !name || !role || !foto){
        res.status(500).json({message: "yaa error"})
    };
    //validasi berhsail
    const newPembicara: Pembicara = {
        id: Date.now(),
        name: name,
        role: role,
        foto: foto,
    };

    //jika sudah disusun simpan ke array
    pembicara.push(newPembicara);

    //jika data berhasil disimpan
    res.status(200).json({message : "Data berhasil disimpan", pembicara: newPembicara});

};

// menampilkan data pembicara berdasrkan id
export const showPembicaraById = (req: Request<{ id: string }>, res: Response ): void => {
    const pembicaraId = parseInt(req.params.id, 10);
    const pembicaraData = pembicara.find((p) => p.id === pembicaraId);

    if (!pembicaraData) {
        res.status(404).json({ success: false, message: 'Pembicara tidak ditemukan' });
        return;
    }

    res.status(200).json({ success : true, data : pembicaraData})
};

// mengupdate pembicara berdasrkan id
export const updatePembicaraById = (req: Request< { id: string }>, res : Response) => {
    const pembicaraId = parseInt(req.params.id, 10);
    const pembicaraIndex = pembicara.findIndex((p) => p.id === pembicaraId);

    if (pembicaraIndex === -1) {
        res.status(404).json({ success : false, message : 'Pembicara tidak ditemukan' });
        return;
    };

    const existingPembicara = pembicara[pembicaraIndex];

    if (!existingPembicara) {
        res.status(404).json({ success : false, message : 'pembicara tidak valid' });
        return;
    };

    const {name, role, foto } = req.body;

    const updatePembicara : Pembicara = {
        id : pembicaraId,
        name : name || existingPembicara.name,
        role : role || existingPembicara.role,
        foto : foto || existingPembicara.foto,

    };

    pembicara[pembicaraIndex] = updatePembicara;

    res.status(200).json({ success : true, message : 'pembicara berhasil diupdate', data : updatePembicara });
};


// menghapus pembicara berdasarkan id
export const delatePembicaraById = (req : Request<{ id: string} >, res : Response) => {
    const pembicaraId = parseInt(req.params.id, 10);
    const pembicaraIndex = pembicara.findIndex((p) => p.id = pembicaraId);

    if (pembicaraIndex === -1) {
        res.status(404).json({success : false, message : 'pembicara tidak ditemukan' });
    };
    pembicara.splice(pembicaraIndex, 1);
    res.status(200).json({ success : true, message : 'pembicara berhasil dihapus' });


    };