import { Request, Response } from "express";
import { Guardian, GuardianI } from "../database/models/guardian";

export class GuardianController {
  public async getAllGuardians(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      const guardians = await Guardian.findAll({ where });
      res.status(200).json({ guardians });
    } catch (error) {
      res.status(500).json({ error: "Error fetching guardians" });
    }
  }

  public async getGuardianById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const guardian = await Guardian.findOne({
        where: { id: pk },
      });

      if (guardian) {
        res.status(200).json(guardian);
      } else {
        res.status(404).json({ error: "Guardian not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching guardian" });
    }
  }

  public async createGuardian(req: Request, res: Response) {
    const {
      firstName,
      lastName,
      document,
      phone,
      email,
      relationship,
      address,
      status,
    } = req.body;

    try {
      const body: GuardianI = {
        firstName,
        lastName,
        document,
        phone,
        email,
        relationship,
        address,
        status,
      };

      const newGuardian = await Guardian.create({ ...body });
      res.status(201).json(newGuardian);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateGuardian(req: Request, res: Response) {
    const { id: pk } = req.params;
    const {
      firstName,
      lastName,
      document,
      phone,
      email,
      relationship,
      address,
      status,
    } = req.body;

    try {
      const body: GuardianI = {
        firstName,
        lastName,
        document,
        phone,
        email,
        relationship,
        address,
        status,
      };

      const guardianToUpdate = await Guardian.findOne({
        where: { id: pk },
      });

      if (guardianToUpdate) {
        await guardianToUpdate.update(body);
        res.status(200).json(guardianToUpdate);
      } else {
        res.status(404).json({ error: "Guardian not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteGuardian(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const guardianToDelete = await Guardian.findByPk(pk);

      if (guardianToDelete) {
        await guardianToDelete.destroy();
        res.status(200).json({ message: "Guardian deleted successfully" });
      } else {
        res.status(404).json({ error: "Guardian not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting guardian" });
    }
  }

  public async deleteGuardianAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const guardianToDisable = await Guardian.findOne({
        where: { id: pk },
      });

      if (guardianToDisable) {
        await guardianToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Guardian marked as inactive" });
      } else {
        res.status(404).json({ error: "Guardian not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking guardian as inactive" });
    }
  }
}
