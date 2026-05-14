import { Request, Response  } from "express";
import { Event  } from "../types/event.js";

let events: Event[] = [];

//1. menampilkan Event
export const getEvents = (req: Request, res: Response) => {
   res.json(events);
};

// menyimpan data event
export const saveEvents = (req: Request, res: Response) => {
    const {name, date, location, description} = req.body;

    // validasi sederhana
    if(!name || !date || !location) {
        res.status(500).json({message: "yaa erorr"})
    }
    //validasi berhsail
    const newEvent : Event = {
        id: Date.now(),
        name: name,
        date: date,
        location: location,
        description: description,
    };

    events.push(newEvent);
    res.status(200).json({message : "Data berhasil disimpan", event: newEvent});
   
};          

// menampilkan data event berdasrkan id
export const showEventById = (req: Request<{ id: string }>, res: Response): void => {
    const eventId = parseInt(req.params.id, 10);
    const event = events.find((e) => e.id === eventId);

    if (!event) {
        res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
        return;
    }

    res.status(200).json({ success: true, data: event });
};

// mengupdate event berdasrkan id
export const updateEventById = (req: Request<{ id: string }>, res: Response) => {
   const eventId = parseInt(req.params.id, 10);
   const eventIndex = events.findIndex((e) => e.id === eventId);

   if (eventIndex === -1) {
      res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
      return;
   }

   const existingEvent = events[eventIndex];

   if (!existingEvent) {
      res.status(404).json({ success: false, message: 'Event tidak valid' });
      return;
   }

   const { name, description, date, location } = req.body;

   const updatedEvent: Event = {
      id: existingEvent.id, 
      name: name || existingEvent.name,
      description: description || existingEvent.description,
      date: date || existingEvent.date,
      location: location || existingEvent.location
   };

   events[eventIndex] = updatedEvent;

   res.status(200).json({
      success: true,
      message: 'Event berhasil diperbarui',
      data: updatedEvent
   });
};

// menghapus event berdasarkan id
export const deleteEventById = (req: Request<{ id: string }>, res: Response) => {
        const eventId = parseInt(req.params.id, 10);
        const eventIndex = events.findIndex((e) => e.id === eventId);
    
        if (eventIndex === -1) {
            res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
            return;
        }
    
        // Hapus event dari array
        const deletedEvent = events.splice(eventIndex, 1);
    
        res.status(200).json({
            success: true,
            message: 'Event berhasil dihapus',
            data: deletedEvent[0]
        }); 
    };