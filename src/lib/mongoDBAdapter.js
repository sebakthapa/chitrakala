
import { ObjectId } from "mongodb";
export const defaultCollections = {
    Users: "users",
    Accounts: "accounts",
    Sessions: "sessions",
    VerificationTokens: "verification_tokens",
    UsersDetails: "usersdetails", // added this to reference userdetails collection by UserDetails
};
export const format = {
    /** Takes a mongoDB object and returns a plain old JavaScript object */
    from(object) {
        const newObject = {};
        for (const key in object) {
            const value = object[key];
            if (key === "_id") {
                newObject.id = value.toHexString();
            }
            else if (key === "userId") {
                newObject[key] = value.toHexString();
            }
            else {
                newObject[key] = value;
            }
        }
        return newObject;
    },
    /** Takes a plain old JavaScript object and turns it into a mongoDB object */
    to(object) {
        const newObject = {
            _id: _id(object.id),
        };
        for (const key in object) {
            const value = object[key];
            if (key === "userId")
                newObject[key] = _id(value);
            else if (key === "id")
                continue;
            else
                newObject[key] = value;
        }
        return newObject;
    },
};
/** @internal */
export function _id(hex) {
    if (hex?.length !== 24)
        return new ObjectId();
    return new ObjectId(hex);
}

export function MongoDBAdapter(client, options = {}) {
    const { collections } = options;
    const { from, to } = format;
    const db = (async () => {
        const _db = (await client).db(options.databaseName);
        const c = { ...defaultCollections, ...collections };
        return {
            U: _db.collection(c.Users),
            UD: _db.collection(c.UsersDetails), // added this as return value that returns db.collection("userdetails") along with other collections
            A: _db.collection(c.Accounts),
            S: _db.collection(c.Sessions),
            V: _db.collection(c?.VerificationTokens),
        };
    })();
    return {
        async createUser(data) {
            console.log("CREATING NEW USER", data)
            const { email, name, image, isEmailVerified, isArtist } = data;
            let user;
            if (isEmailVerified) {
                user = to({email, emailVerified: new Date(), isArtist });
            } else {
                user = to({email, isArtist });
            }
            const addedUser = await (await db).U.insertOne(user);
            const userDetails = to({name, image, user:addedUser.insertedId}); // added this to make collection ready to add in mongodb
            await (await db).UD.insertOne(userDetails); // added this to add userDetails data to collection
            return from(user);
        },
        async getUser(id) {
            const user = await (await db).U.findOne({ _id: _id(id) });
            if (!user)
                return null;
            return from(user);
        },
        async getUserByEmail(email) {
            const user = await (await db).U.findOne({ email });
            if (!user)
                return null;
            return from(user);
        },
        async getUserByAccount(provider_providerAccountId) {
            const account = await (await db).A.findOne(provider_providerAccountId);
            if (!account)
                return null;
            const user = await (await db).U.findOne({ _id: new ObjectId(account.userId) });
            if (!user)
                return null;
            return from(user);
        },
        async updateUser(data) {
            const { _id, ...user } = to(data);
            const result = await (await db).U.findOneAndUpdate({ _id }, { $set: user }, { returnDocument: "after" });
            return from(result);
        },
        async deleteUser(id) {
            const userId = _id(id);
            const m = await db;
            await Promise.all([
                m.A.deleteMany({ userId: userId }),
                m.S.deleteMany({ userId: userId }),
                m.U.deleteOne({ _id: userId }),
            ]);
        },
        linkAccount: async (data) => {
            const account = to(data);
            await (await db).A.insertOne(account);
            return account;
        },
        async unlinkAccount(provider_providerAccountId) {
            const account = await (await db).A.findOneAndDelete(provider_providerAccountId);
            return from(account);
        },
        async getSessionAndUser(sessionToken) {
            const session = await (await db).S.findOne({ sessionToken });
            if (!session)
                return null;
            const user = await (await db).U.findOne({ _id: new ObjectId(session.userId) });
            if (!user)
                return null;
            return {
                user: from(user),
                session: from(session),
            };
        },
        async createSession(data) {
            const session = to(data);
            await (await db).S.insertOne(session);
            return from(session);
        },
        async updateSession(data) {
            const { _id, ...session } = to(data);
            const updatedSession = await (await db).S.findOneAndUpdate({ sessionToken: session.sessionToken }, { $set: session }, { returnDocument: "after" });
            return from(updatedSession);
        },
        async deleteSession(sessionToken) {
            const session = await (await db).S.findOneAndDelete({
                sessionToken,
            });
            return from(session);
        },
        async createVerificationToken(data) {
            await (await db).V.insertOne(to(data));
            return data;
        },
        async useVerificationToken(identifier_token) {
            const verificationToken = await (await db).V.findOneAndDelete(identifier_token);
            if (!verificationToken)
                return null;
            const { _id, ...rest } = verificationToken;
            return rest;
        },
    };
}
