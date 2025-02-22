import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { readFile } from "fs/promises";
import { GraphQLScalarType } from "graphql";
import { connectToDb, getDb } from "./db.js";
import dotenv from "dotenv";
import cors from "cors"; 

dotenv.config();

let db;

const app = express();

/*
// Optional configuration to restrict CORS to specific origins.
// If you want to allow only certain domains in production, use this block instead of "app.use(cors());".
const allowedOrigins = [
  "http://localhost:3000", // For development
  "https://employee-management-system.vercel.app" // For production (adjust the URL based on the actual domain)
];

app.use(cors({
  origin: allowedOrigins,
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization"
}));
*/

// Allows all requests by default
app.use(cors());
app.use(express.json());

const GraphQLDateResolver = new GraphQLScalarType({
  name: "GraphQLDate",
  description: "GraphQL Date type",
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const newDate = new Date(value);
    return isNaN(newDate) ? undefined : newDate;
  },
});

const EmployeeDirectory = async () => {
  const employees = await db.collection("employees").find({}).toArray();
  return employees;
};

const getEmployeeById = async (id) => {
  try {
    const instance = await db.collection("employees");
    return instance.findOne({ id });
  } catch (err) {
    console.log(err);
  }
};

const deleteEmployee = async (_, { id }) => {
  const deletedEmployee = await db.collection("employees").findOne({ id: id });
  if (deletedEmployee) {
    const result = await db.collection("employees").deleteOne({ id: id });
    if (result.deletedCount === 1) {
      return deletedEmployee;
    }
  }
  return null;
};

const typeDefs = await readFile("./schema.graphql", "utf8");

const resolvers = {
  Query: {
    EmployeeDirectory: EmployeeDirectory,
    getEmployeeById: (_, { id }) => getEmployeeById(id),
  },
  Mutation: {
    addEmployee: async (_, args) => {
      // Get the current total number of employees in the database
      let totalEmployees = await db.collection("employees").countDocuments();

      // Generate the new employee's id
      let newEmployeeId = `EMP${totalEmployees}`;
      while (await db.collection("employees").findOne({ id: newEmployeeId })) {
        totalEmployees++;
        newEmployeeId = `EMP${totalEmployees}`;
      }

      // Create the employee object with the generated id
      const newEmployee = { ...args.employee, id: newEmployeeId };

      // Insert the new employee into the database
      const result = await db.collection("employees").insertOne(newEmployee);

      if (result.insertedId) {
        // Retrieve and return the added employee with the new id
        const addedEmployee = await db
          .collection("employees")
          .findOne({ _id: result.insertedId });
        return addedEmployee;
      }
      return null;
    },
    deleteEmployee: deleteEmployee,
    updateEmployee: async (_, args) => {
      // Extract the application-specific 'id' from the args
      const { id, employee } = args;
      // console.log(employee , id)

      const existingEmployee = await db.collection("employees").findOne({ id });
      if (!existingEmployee) {
        // Handle error: Employee not found
        return null;
      }

      const updatedEmployee = await db
        .collection("employees")
        .findOneAndUpdate(
          { id: id },
          { $set: employee },
          { returnDocument: "after" }
        );

      if (updatedEmployee) {
        return updatedEmployee;
      }
      return null;
    },
  },
  GraphQLDate: GraphQLDateResolver,
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start(); // Ensure server is started before applying middleware

app.use("/graphql", expressMiddleware(apolloServer));

const PORT = process.env.PORT || 5003;

connectToDb((url, err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`Express Server started on port ${PORT}`);
      console.log(`GraphQL running at http://localhost:${PORT}/graphql`);
      console.log("MongoDb connected to ", url);
    });
    db = getDb();
  }
});
