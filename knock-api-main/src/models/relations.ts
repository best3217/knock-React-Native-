import Contact from "./Contact";
import ContactNote from "./ContactNote";
import ContactNoteType from "./ContactNoteType";
import Doors from "./Doors";
import PostCard from "./PostCard";
import User from "./User";
import UserRole from "./UserRole";

export default () => {
  User.belongsTo(UserRole, { foreignKey: "frn_user_roleid", as: "role" });
  User.belongsTo(Doors, { foreignKey: "frn_doorid", as: "door" });
  User.hasMany(Contact, {
    foreignKey: "frn_from_userid",
    as: "contacts_from"
  });
  User.hasMany(Contact, {
    foreignKey: "frn_to_userid",
    as: "contacts_to"
  });
  Contact.hasMany(ContactNote, {
    foreignKey: "frn_contactid",
    as: "contact_notes"
  });
  ContactNote.belongsTo(ContactNoteType, {
    foreignKey: "frn_contact_note_typeid",
    as: "note_type"
  });  
}
