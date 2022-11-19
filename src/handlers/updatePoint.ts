import prisma from "../db";

export const getUpdatePoints = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.map((product) => product.updates).flat();
    const updateIdList = updates.map((update) => update.id).flat();

    const updatePoints = await prisma.updatePoint.findMany({
      where: {
        updateId: {
          in: updateIdList,
        },
      },
    });

    res.json({ data: updatePoints });
  } catch (e) {
    next(e);
  }
};

export const getUpdatePointById = async (req, res, next) => {
  try {
    const updatePoint = await prisma.updatePoint.findUnique({
      where: {
        id: req.params.id,
      }
    });
    if (!updatePoint) {
      return res.json({ message: "update point not found" });
    }
    const update = await prisma.update.findUnique({
      where: {
        id: updatePoint.updateId,
      }
    });
    const product = await prisma.product.findUnique({
      where: {
        id: update.productId,
      }
    });
    if (product.belongsToId !== req.user.id) {
      return res.json({ message: "unauthorized access" });
    }

    res.json({ data: updatePoint });
  } catch (e) {
    next(e);
  }
};

export const createUpdatePoint = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.map((prod) => prod.updates).flat();

    const match = updates.find((update) => update.id === req.body.updateId);

    if (!match) {
      return res.json({ message: "no product found" });
    }

    const updatePoint = await prisma.updatePoint.create({
      data: req.body,
    });

    res.json({ data: updatePoint });
  } catch (e) {
    next(e);
  }
};

export const deleteUpdatePoint = async (req, res, next) => {
  try {
    const updatePoint = await prisma.updatePoint.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!updatePoint) {
      return res.json({ message: "update point not found" });
    }

    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.map((product) => product.updates).flat();
    const updateIdList = updates.map((update) => update.id).flat();

    if (updateIdList.includes(updatePoint.updateId)) {
      const deletedUpdatePoint = await prisma.updatePoint.delete({
        where: {
          id: req.params.id,
        },
      });

      return res.json({ data: deletedUpdatePoint });
    } else {
      return res.json({ message: "unauthorized access" });
    }
  } catch (e) {
    next(e);
  }
};

export const updateUpdatePoint = async (req, res, next) => {
  try {
    const updatePoint = await prisma.updatePoint.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!updatePoint) {
      return res.json({ message: "update point not found" });
    }

    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.map((product) => product.updates).flat();
    const updateIdList = updates.map((update) => update.id).flat();

    if (updateIdList.includes(updatePoint.updateId)) {
      const updated = await prisma.updatePoint.update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      });

      return res.json({ data: updated });
    } else {
      return res.json({ message: "unauthorized access" });
    }
  } catch (e) {
    next(e);
  }
};
