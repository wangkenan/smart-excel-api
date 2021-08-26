/* indent size: 1 */

module.exports = app => {
	const DataTypes = app.Sequelize;

	const Model = app.model.define('users', {
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		mobile: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		code: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		last_login: {
			type: DataTypes.DATE,
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'users'
	});

	Model.associate = function() {

	}

	return Model;
};
