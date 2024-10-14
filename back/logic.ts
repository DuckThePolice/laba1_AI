import { CreationOptional, DataTypes, InferAttributes, Model } from "sequelize";
import { Request, Response } from "express";
import { storage } from "./connection.js";
import { Expose, plainToClass, plainToInstance } from "class-transformer";
let tree;
class Entry extends Model<InferAttributes<Entry>, CreateEntry> {
  id!: CreationOptional<number>;
  yes_root!: number;
  no_root!: number;
  text!: string;
  final!: boolean;
}

class CreateEntry {
  yes_root!: number;
  no_root!: number;
  text!: string;
  final!: boolean;
}

class UpdateEntry {
  id!: number;
  yes_root!: number;
  no_root!: number;
  final!: boolean;
}
export async function Main_Entry() {
  Entry.init(
    {
      id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
      yes_root: { type: DataTypes.BIGINT, allowNull: true },
      no_root: { type: DataTypes.BIGINT, allowNull: true },
      text: { type: DataTypes.TEXT, allowNull: false },
      final: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { sequelize: storage, timestamps: false, tableName: "Entries" }
  );

  Entry.belongsTo(Entry, { foreignKey: "yes_root" });
  Entry.belongsTo(Entry, { foreignKey: "no_root" });

  tree = await Entry.findAll();
  return tree[0].dataValues.text;
}

export async function getEntries(req: Request, res: Response) {
  tree = await Entry.findAll();
  return res.status(201).json(tree);
}

export async function addEntry(req: Request, res: Response) {
  const body = plainToInstance(CreateEntry, req.body);
  const created = await Entry.create({
    yes_root: body.yes_root,
    no_root: body.no_root,
    text: body.text,
    final: body.final,
  });
  if (!created) {
    return res.status(409).json({ msg: "Ошибка создания вхождения" });
  }
  return res.status(201).json({ id: created.id });
}

export async function updateEntry(req: Request, res: Response) {
  const body = plainToInstance(UpdateEntry, req.body);
  let entry = await Entry.findOne({ where: { id: body.id } });
  if (!entry)
    return res.status(404).json({ msg: "Такого вхождения не существует" });
  const updated = await entry.update({
    yes_root: body.yes_root,
    no_root: body.no_root,
    final: body.final,
  });
  if (!updated) {
    return res.status(404).json({ msg: "Ошибка обновления вхождения" });
  }
  return res.status(201).json({ id: updated.id });
}
