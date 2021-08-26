/* indent size: 1 */

module.exports = app => {
	const DataTypes = app.Sequelize;

	const Model = app.model.define('goods', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		goods_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		link_url: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		image_url: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		group: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		group_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		visitor_num: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		pay_piece_num: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		pay_people_num: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		pay_amount_num: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		pay_transform_percentage: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		atv_num: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		search_num: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		search_percentage: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		repurchase_num: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		repurchase_percentage: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		collect_num: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		collect_percentage: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		uv_value: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		cate_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		table_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		date: {
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
		tableName: 'goods'
	});

	Model.associate = function() {

	}

	return Model;
};
