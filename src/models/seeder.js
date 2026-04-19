const { users, tickets, comments, history } = require('./seeder-data');
const { hashPassword } = require('../utils/password');
const logger = require('../core/logger')('seeder');

module.exports = async (models) => {
  try {
    const userCount = await models.Users.countDocuments();

    if (userCount === 0) {
      logger.info('Database kosong. Memulai seeding data dummy...');

      // 1. Seed Users
      const hashedUsers = await Promise.all(
        users.map(async (u) => {
          const userDoc = {
            email: u.email,
            password: await hashPassword(u.password),
            full_name: u.fullName,
            role: u.role,
          };
          userDoc._id = u._id; // Menyimpan ID custom
          return userDoc;
        })
      );
      const createdUsers = await models.Users.insertMany(hashedUsers);
      logger.info(`${createdUsers.length} Users berhasil di-seed.`);

      // 2. Seed Tickets
      const ticketDocs = tickets.map((t, index) => {
        const user = createdUsers[index % createdUsers.length];
        return {
          ...t,
          user_id: user._id,
        };
      });
      const createdTickets = await models.Tickets.insertMany(ticketDocs);
      logger.info(`${createdTickets.length} Tickets berhasil di-seed.`);

      // 3. Seed Comments
      if (comments && comments.length > 0) {
        const commentDocs = comments.map((c) => ({
          ticket_id: createdTickets[c.ticketIndex]._id,
          user_id: c.userId,
          content: c.content,
        }));
        await models.Comments.insertMany(commentDocs);
        logger.info(`${commentDocs.length} Comments berhasil di-seed.`);
      }

      // 4. Seed History
      if (history && history.length > 0) {
        const historyDocs = history.map((h) => ({
          ticket_id: createdTickets[h.ticketIndex]._id,
          user_id: h.userId,
          action: h.action,
          details: h.details,
        }));
        await models.History.insertMany(historyDocs);
        logger.info(`${historyDocs.length} History logs berhasil di-seed.`);
      }

      logger.info('Semua proses seeding data dummy selesai!');
    }
  } catch (error) {
    logger.error(`Gagal menjalankan seeder: ${error.message}`);
  }
};
