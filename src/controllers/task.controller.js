import asyncHandler from 'express-async-handler';
import moment from 'moment-timezone';
import Task from '../models/tasks.js';
import dayjs from 'dayjs';


function storeCurrentDate(expirationAmount, expirationUnit) {
    // Get the current date and time in Asia/Manila timezone
    const currentDateTime = moment.tz("Asia/Manila");
    // Calculate the expiration date and time
    const expirationDateTime = currentDateTime.clone().add(expirationAmount, expirationUnit);

    // Format the current date and expiration date
    const formattedExpirationDateTime = expirationDateTime.format('YYYY-MM-DD');

    // Return both current and expiration date-time
    return formattedExpirationDateTime;

}


export const create_task = asyncHandler(async (req, res) => {
    const { amount, description, category } = req.body;
    
    try {
        // Check if all required fields are provided
        if (!amount || !description || !category) {
            return res.status(400).json({ error: "Please provide all fields (amount, description and category)." });
        }

        const newTask = new Task({
            amount: amount,
            description: description,
            category: category,
            userId: req.user.user._id,
            created_at: storeCurrentDate(0, 'hours'),
        });
           

        await newTask.save();

        return res.status(200).json({ message: 'Task successfully created.' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create task.' });
    }
});

export const get_all_task = asyncHandler(async (req, res) => {    
    try {
        const { page = 1, limit = 10, sortBy = 'created_at', order = 'desc', category, date_range, start_date, end_date } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const sortOrder = order === 'asc' ? 1 : -1;
        const query = { userId: req.user.user._id };
        const now = dayjs();


        if (category) {
            query.category = { $regex: category, $options: 'i' };
        }


        if (date_range === 'week') {
            query.created_at = {
                $gte: now.subtract(7, 'day').startOf('day').toDate(),
                $lte: now.endOf('day').toDate()
            };
        } else if (date_range === 'month') {
            query.created_at = {
                $gte: now.subtract(1, 'month').startOf('day').toDate(),
                $lte: now.endOf('day').toDate()
            };
        } else if (date_range === '3months') {
               query.created_at = {
                $gte: now.subtract(3, 'month').startOf('day').toDate(),
                $lte: now.endOf('day').toDate()
            };
        } else if (date_range === 'custom') {
            if (start_date && end_date) {
                query.created_at = {
                    $gte: new Date(start_date),
                    $lte: new Date(end_date)
                };
            }
        }


        const [data, total] = await Promise.all([
            Task.find(query)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(Number(limit)),
            Task.countDocuments(query)
        ]);


        return res.status(200).json({ data, page: Number(page), limit: Number(limit), total });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get all todo lists.' });
    }
});




export const get_specific_task = asyncHandler(async (req, res) => {
    const { id } = req.params; 

    try {
        const task = await Task.findOne({ _id: id, userId: req.user.user._id });
        if (!task) return res.status(404).json({ error: 'Task not found' });

        res.status(200).json({ data: task });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get specific task.' });
    }
});



export const update_task = asyncHandler(async (req, res) => {    
    const { id } = req.params; 
    const { amount, description, category } = req.body;

    try {
        const task = await Task.findById(id);

        if (!task || task.userId.toString() !== req.user.user._id) {
            return res.status(403).json({ error: 'Forbidden' });
        }   

        if (!amount || !description || !category) {
            return res.status(400).json({ error: "All fields are required: amount, category and description." });
        }

        task.amount = amount;
        task.description = description;
        task.category = category;
        await task.save();

        return res.status(200).json({ data: task });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update task.' });
    }
});


export const delete_task = asyncHandler(async (req, res) => {    
    const { id } = req.params; // Get the meal ID from the request parameters

    try {
        const task = await Task.findById(id);

        if (!task || task.userId.toString() !== req.user.user._id) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        await task.deleteOne();

        return res.status(200).json({ message: 'Task successfully deleted.' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete task.' });
    }
});


