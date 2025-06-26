import { getCollection } from "../db/mongodb.js";

export const getUsers = async (req, res) => {
  const { page = 1, limit = 10, phoneNumber, name, email } = req.query;

  try {
    const collection = getCollection("users");

    const query = {};

    if (phoneNumber && phoneNumber.trim() !== "") {
      query.phoneNumber = phoneNumber;
    }

    if (name && name.trim() !== "") {
      query.name = new RegExp(name, "i");
    }

    if (email && email.trim() !== "") {
      query.email = new RegExp(`^${email.trim()}$`, "i");
    }

    const users = await collection
      .find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .toArray();

    const total = await collection.countDocuments(query);

    res.json({
      count: total,
      response: {
        items: users,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
