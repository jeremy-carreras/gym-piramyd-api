const TipoUsuario = require('./tablas/TipoUsuario');
const Cliente = require('./tablas/Cliente');
const Pago = require('./tablas/Pago');
const Plan = require('./tablas/Plan');
const Trabajador = require('./tablas/Trabajador');
const { encriptar } = require('../helper/encriptar');
const sequelize = require('../config/sequelize.conf');

const dataPlanes = async () => {
  let planes = ['Semanal', 'Mensual', 'Anual'];
  const precios = [100, 200, 1000];

  for (let i = 0; i < planes.length; i++) {
    await Plan.create({
      nombre: planes[i],
      precio: precios[i],
    });
    console.log(`Se insertó el plan ${planes[i]}.`.magenta);
  }
};

const dataAdmin = async () => {
  let tiposUser = ['Admin', 'Operador'];

  for (let i = 0; i < tiposUser.length; i++) {
    await TipoUsuario.create({
      nombre: tiposUser[i],
    });
    console.log(`Se insertó el tipo usuario ${tiposUser[i]}.`.magenta);
  }
};

const dataClientes = async () => {
  let clientes = [
    {
      nombre: 'Cliente 1',
      fechaNac: '2000-02-06',
      telefono: '5548395756',
      telefonoEmergencia: '5548395756',
      correo: 'marco@acatlan.unam.mx',
      tipoSangre: 'AB+',
    },
    {
      nombre: 'Cliente 2',
      fechaNac: '2000-02-07',
      telefono: '5548395756',
      telefonoEmergencia: '5548395756',
      correo: 'marco@acatlan.unam.mx',
      tipoSangre: 'AB+',
    },
    {
      nombre: 'Cliente 3',
      fechaNac: '2000-02-08',
      telefono: '5548395756',
      telefonoEmergencia: '5548395756',
      correo: 'lemuel@acatlan.unam.mx',
      tipoSangre: 'AB+',
    },
    {
      nombre: 'Cliente 4',
      fechaNac: '2000-02-09',
      telefono: '5548395756',
      telefonoEmergencia: '5548395756',
      correo: 'jeremy@acatlan.unam.mx',
      tipoSangre: 'AB+',
    },
  ];

  for (let i = 0; i < clientes.length; i++) {
    await Cliente.create({
      nombre: clientes[i].nombre,
      fechaNacimiento: clientes[i].fechaNac,
      telefono: clientes[i].telefono,
      telefonoEmergencia: clientes[i].telefonoEmergencia,
      correo: clientes[i].correo,
      tipoSangre: clientes[i].tipoSangre,
    });
    console.log(`Se insertó el cliente ${clientes[i].nombre}.`.magenta);
  }
};

const dataTrabajadores = async () => {
  let trabajadores = [
    {
      nombre: 'Trabajador 1',
      usuario: 'trabajador1',
    },
    {
      nombre: 'Trabajador 2',
      usuario: 'trabajador2',
    },
    {
      nombre: 'Trabajador 3',
      usuario: 'trabajador3',
    },
    {
      nombre: 'Trabajador 4',
      usuario: 'trabajador4',
    },
  ];

  await Trabajador.create({
    nombre: 'Admin',
    password: encriptar('holi'),
    usuario: 'Admin',
    idTipoUsuario: 1,
    telefono: '1234567890',
  });
  console.log(`Se insertó el admin.`.magenta);
  for (let i = 0; i < trabajadores.length; i++) {
    await Trabajador.create({
      nombre: trabajadores[i].nombre,
      usuario: trabajadores[i].usuario,
      password: encriptar('holi'),
      idAdmin: 1,
      idTipoUsuario: 2,
      telefono: '1234567890',
    });
    console.log(`Se insertó el trabajador ${trabajadores[i].nombre}.`.magenta);
  }
};

const dataPagos = async () => {
  let pagos = ['11111111', '22222222', '33333333'];
  const precios = [100, 400, 3000];

  for (let i = 0; i < pagos.length; i++) {
    await Pago.create({
      folio: pagos[i],
      monto: precios[i],
      cantidad: i + 1,
      idCliente: i + 1000,
      idTrabajador: i + 1,
      idPlan: i + 1,
    });
    console.log(`Se insertó el pago ${pagos[i]}.`.magenta);
  }
};

const exec = async () => {
  await dataPlanes();
  await dataAdmin();
  await dataClientes();
  await dataTrabajadores();
  await dataPagos();
  console.log(
    '\nSe ha instalado exitosamente la información falsa en la base de datos.\n'
      .underline.bold.green
  );
  process.exit();
};

exec();
