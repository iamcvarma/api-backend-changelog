import prisma from "../db";

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

export const getAllUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const allUpdates = products.map((product) => product.updates).flat();

  res.json({ data: allUpdates });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    res.json({ message: "no product found" });
  }

  const update = await prisma.update.create({
    data: req.body,
  });
  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include:{
        updates:true,
    }
  });

  const allUpdates = products.map(product=>product.updates).flat()

  const match = allUpdates.find(update=>update.id===req.params.id)

  if (!match){
    res.json({data:'update not found'})
  }
  const newUpdate = await prisma.update.update({
    where:{
        id:match.id,
    },
    data:req.body
  })

  res.json({data:newUpdate})
};


export const deleteUpdate = async(req,res)=>{
    const products = await prisma.product.findMany({
        where: {
          belongsToId: req.user.id,
        },
        include:{
            updates:true,
        }
      });
    
      const allUpdates = products.map(product=>product.updates).flat()
    
      const match = allUpdates.find(update=>update.id===req.params.id)
    
      if (!match){
        res.json({data:'update not found'})
        return
      }

      const deletedUpdate = await prisma.update.delete({
        where:{
            id:match.id
        }
      })

      res.json({data:deletedUpdate})
}