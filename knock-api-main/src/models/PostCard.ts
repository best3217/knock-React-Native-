import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const PostCard = sequelize.define(
  "post_card",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    card_name: {
      type: DataTypes.STRING
    },
    frn_userid: {
      type: DataTypes.BIGINT
    },
    attachment_url: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  },
  {
    timestamps: true,
    tableName: 'post_card',
  }
);

export default PostCard;
