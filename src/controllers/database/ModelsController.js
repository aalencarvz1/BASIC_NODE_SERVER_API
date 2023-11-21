const { Errors } = require("../../database/models/Errors");
const { Logs } = require("../../database/models/Logs");
const { DataTables } = require("../../database/models/DataTables");
const { DataConnections } = require("../../database/models/DataConnections");
const { DataSchemas } = require("../../database/models/DataSchemas");
const { Contexts } = require("../../database/models/Contexts");
const { DataTypes } = require("../../database/models/DataTypes");
const { Parameters } = require("../../database/models/Parameters");
const { ParametersValues } = require("../../database/models/ParametersValues");
const { OriginsDatas } = require("../../database/models/OriginsDatas");
const { StatusRegs } = require("../../database/models/StatusRegs");
const { StatusSync } = require("../../database/models/StatusSync");
const { IdentifiersTypes } = require("../../database/models/IdentifiersTypes");
const { People } = require("../../database/models/People");
const { Collaborators } = require("../../database/models/Collaborators");
const { AccessesProfiles } = require("../../database/models/AccessesProfiles");
const { Users } = require("../../database/models/Users");
const { UsersTokens } = require("../../database/models/UsersTokens");
const { RoutinesTypes } = require("../../database/models/RoutinesTypes");
const { Modules } = require("../../database/models/Modules");
const { Routines } = require("../../database/models/Routines");
const { Languages } = require("../../database/models/Languages");
const { DataRelationshipTypes } = require("../../database/models/DataRelationshipTypes");
const { DatasRelationships } = require("../../database/models/DatasRelationships");
const { ValuesNames } = require("../../database/models/ValuesNames");
const { DatasRelationshipsValues } = require("../../database/models/DatasRelationshipsValues");
const { DatasValues } = require("../../database/models/DatasValues");
const { DatasHierarchies } = require("../../database/models/DatasHierarchies");
const { Clients } = require("../../database/models/Clients");
const { PowersTypes } = require("../../database/models/PowersTypes");
const { Permissions } = require("../../database/models/Permissions");

/**
 * Class to handle start models (actualy using sequelize). This models require that it is initied, because
 * models is implemented as class models (according https://sequelize.org/docs/v6/core-concepts/model-basics/).
 * Init method in models not create fisical tables, these only initialize model and associations (FKs). Fisical tables
 * are created by run migrations commands (vide sequelize-cli module in https://github.com/sequelize/cli)
 * @author Alencar
 * @created 2023-08-10
 */
class ModelsController{

    /**
     * Method to init models, need this to can use model as class, according sequelize documentation.
     * this method must have called on start server
     * @created 2023-08-10
     */
    static initModels(){           
        Errors.getModel();
        Logs.getModel();
        DataTables.getModel();
        DataConnections.getModel();
        DataSchemas.getModel();
        Contexts.getModel();
        DataTypes.getModel();
        Parameters.getModel();
        ParametersValues.getModel();
        OriginsDatas.getModel();
        StatusRegs.getModel();
        StatusSync.getModel();
        IdentifiersTypes.getModel();
        People.getModel();
        Collaborators.getModel();
        AccessesProfiles.getModel();
        Users.getModel();
        UsersTokens.getModel();
        RoutinesTypes.getModel();
        Modules.getModel();
        Routines.getModel();
        Languages.getModel();
        DataRelationshipTypes.getModel();
        DatasRelationships.getModel();
        ValuesNames.getModel();
        DatasRelationshipsValues.getModel();
        DatasValues.getModel();
        DatasHierarchies.getModel();
        Clients.getModel();
        PowersTypes.getModel();
        Permissions.getModel();

        ModelsController.initAssociations();
    }


    /**
     * method to call all models associations init, 
     * @created 2023-08-10
     */
    static initAssociations(){
        Errors.initAssociations();
        Logs.initAssociations();
        DataTables.initAssociations();
        DataConnections.initAssociations();
        DataSchemas.initAssociations();
        Contexts.initAssociations();
        DataTypes.initAssociations();
        Parameters.initAssociations();
        ParametersValues.initAssociations();
        OriginsDatas.initAssociations();
        StatusRegs.initAssociations();
        StatusSync.initAssociations();
        IdentifiersTypes.initAssociations();
        People.initAssociations();
        Collaborators.initAssociations();
        AccessesProfiles.initAssociations();
        Users.initAssociations();
        UsersTokens.initAssociations();
        RoutinesTypes.initAssociations();
        Modules.initAssociations();
        Routines.initAssociations();
        Languages.initAssociations();        
        DataRelationshipTypes.initAssociations();
        DatasRelationships.initAssociations();
        ValuesNames.initAssociations();
        DatasRelationshipsValues.initAssociations();
        DatasValues.initAssociations();
        DatasHierarchies.initAssociations();
        Clients.initAssociations();
        PowersTypes.initAssociations();
        Permissions.initAssociations();
    }
}



module.exports = { ModelsController };
