const Links = require('../model/Links');

const linkController = {
  create: async (req, res) => {
    const { campaignTitle, originalUrl, category, thumbnail } = req.body;
    try {
      const link = new Links({
        campaignTitle,
        originalUrl,
        category,
        thumbnail,
        user: req.user._id,
      });
      await link.save();
      res.json({ data: { linkId: link._id } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAll: async (req, res) => {
    try {
      const links = await Links.find({ user: req.user._id }).sort({ createdAt: -1 });
      res.json({ data: links });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const linkId = req.params.id;
      const link = await Links.findById(linkId);
      if (!link) return res.status(404).json({ error: "Link not found" });
      if (link.user.toString() !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      res.json({ data: link });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  update: async (req, res) => {
    try {
      const linkId = req.params.id;
      const link = await Links.findById(linkId);
      if (!link) return res.status(404).json({ error: "Link not found" });
      if (link.user.toString() !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const { campaignTitle, originalUrl, category } = req.body;
      const updatedLink = await Links.findByIdAndUpdate(
        linkId,
        { campaignTitle, originalUrl, category },
        { new: true }
      );
      res.json({ data: updatedLink });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  delete: async (req, res) => {
    try {
      const linkId = req.params.id;
      const link = await Links.findById(linkId);
      if (!link) return res.status(404).json({ error: "Link not found" });
      if (link.user.toString() !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      await Links.findByIdAndDelete(linkId);
      res.json({ message: "Link deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  redirect: async (req, res) => {
    try {
      const linkId = req.params.id;
      const link = await Links.findById(linkId);
      if (!link) return res.status(404).json({ error: "Link not found" });
      link.clickcount += 1;
      await link.save();
      res.redirect(link.originalUrl);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = linkController;
