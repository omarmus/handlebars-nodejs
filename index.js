'use strict';

const express = require('express');
const handlebars = require('handlebars');
const fs = require('fs');
const port = 3030;

const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
const dias = ['D', 'L', 'M', 'M', 'J', 'V', 'S', 'D'];

handlebars.registerHelper('ifIndex', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

let app = express();

app.use(express.static('public'));

app.get('/form', function (req, res) {
  let data = {
    solicitud: {
      cite: 'UD/PRE-080/17',
      fecha: '14/11/2018'
    },
    unidad_solicitante: 'DIRECCIÓN GENERAL DE ESTRATEGIAS/UNIDAD DE DIFUSIÓN',
    objetivo: {
      contratacion: 'DERECHO A LA INFORMACIÓN - MENOS POBREZA, MÁS DIGNIDAD',
      modalidad: {
        licitacion: true,
        anpe: true,
        cont_menor: false,
        cont_directa: true,
        cont_excepcion: true,
        otras: false
      },
      forma: {
        total: true,
        items: false,
        lotes: true
      },
      metodo: {
        precio: true,
        calidad_costo: false,
        menor_costo: false,
        presupuesto: true,
        calidad: false,
        no_aplica: true,
      },
      items: [
        {
          item: 1,
          detalle: 'AEROTAM',
          unidad: 'ARTE',
          cantidad: '1 PÁGINA',
          precio: '-',
          total: 123
        },
        {
          item: 2,
          detalle: 'AEROTAM',
          unidad: 'ARTE',
          cantidad: '1 PÁGINA',
          precio: '-',
          total: 123
        },
        {
          item: 3,
          detalle: 'AEROTAM',
          unidad: 'ARTE',
          cantidad: '1 PÁGINA',
          precio: '-',
          total: 123
        },
        {
          item: 4,
          detalle: 'AEROTAM',
          unidad: 'ARTE',
          cantidad: '1 PÁGINA',
          precio: '-',
          total: 123
        },
        {
          item: 5,
          detalle: 'AEROTAM',
          unidad: 'ARTE',
          cantidad: '1 PÁGINA',
          precio: '-',
          total: 123
        },
        {
          item: 6,
          detalle: 'AEROTAM',
          unidad: 'ARTE',
          cantidad: '1 PÁGINA',
          precio: '-',
          total: 123
        },
        {
          item: 7,
          detalle: 'AEROTAM',
          unidad: 'ARTE',
          cantidad: '1 PÁGINA',
          precio: '-',
          total: 123
        }
      ]
    },
    verificacion: {

    },
    poa: {
      fecha: '01/01/2018',
      numero: '1234',
      objetivo: '26',
      meta: '165',
      partida: '255',
      area: 'U DIF'
    },
    certificacion: {
      fecha: '29/06/2018',
      numero: '12',
      partida: '33',
      act: '4',
      fuente: '456',
      observaciones: 'Ninguna'
    },
    autorizacion: {
      compra: '123',
      servicio: '33',
      contrato: '342',
      fecha: '24/07/1983',
      codigo: 'A-001'
    }
  };
  let total = 0;
  data.objetivo.items.map(item => (total += item.total));
  data.objetivo.total = total;
  let salida = render('solicitud-contratacion.html', data);
  res.send(salida);
});

app.get('/orden', function (req, res) {
  const mes = 7;
  const gestion = 2018;
  const length = diasMes(mes, gestion);
  let data = {
    titulo: 'Orden publicitaria de Televisión',
    orden: {
      canal: {
        nombre: 'CADENA A',
        numero: 36
      },
      encargado: {
        nombre: 'FERNANDO PEREZ',
        celular: '78932688'
      },
      correos: [
        { correo: 'correo1@mail.com' },
        { correo: 'correo2@mail.com' }
      ],
      campana: 'Derecho a la información - Presentación nuevo billete 50bs',
      spot: 'Derecho a la información - Presentación nuevo billete 50bs',
      duracion: {
        tiempo: 59,
        tipo: 'SEG'
      },
      fecha: '09/07/2018',
      cobertura: 'NACIONAL',
      odp: {
        tipo: 'ODPTV',
        numero: '3017/2018'
      },
      observaciones: 'Ninguna'
    },
    detalle: {
      mes: meses[mes - 1],
      gestion: gestion,
      dias: getDias(mes, gestion, length),
      items: [
        {
          tipo: 'LUN-VIE',
          hora: {
            inicio: '06:30',
            fin: '09:00'
          },
          programa: 'Levántate Bolivia',
          dias: [
            {
              dia: 5,
              cantidad: 1
            },
            {
              dia: 6,
              cantidad: 1
            },
            {
              dia: 9,
              cantidad: 1
            },
            {
              dia: 10,
              cantidad: 1
            }
          ],
          pases: 4,
          tiempo_spot: 59,
          precio_segundo: 25.00,
          costo_total: 1475
        },
        {
          tipo: 'LUN-VIE',
          hora: {
            inicio: '06:30',
            fin: '09:00'
          },
          programa: 'Levántate Bolivia 2',
          dias: [
            {
              dia: 5,
              cantidad: 1
            },
            {
              dia: 6,
              cantidad: 1
            },
            {
              dia: 9,
              cantidad: 1
            },
            {
              dia: 10,
              cantidad: 1
            }
          ],
          pases: 4,
          tiempo_spot: 59,
          precio_segundo: 25.00,
          costo_total: 1475
        },
        {
          tipo: 'LUN-VIE',
          hora: {
            inicio: '10:00',
            fin: '12:30'
          },
          programa: 'En su punto',
          dias: [],
          pases: 0,
          tiempo_spot: 59,
          precio_segundo: 25.00
        },
        {
          tipo: 'LUN-VIE',
          hora: {
            inicio: '12:30',
            fin: '14:30'
          },
          programa: 'Tele a noticias meridiano',
          dias: [
            {
              dia: 4,
              cantidad: 2
            },
            {
              dia: 5,
              cantidad: 1
            },
            {
              dia: 6,
              cantidad: 1
            },
            {
              dia: 9,
              cantidad: 1
            },
            {
              dia: 10,
              cantidad: 1
            }
          ],
          pases: 6,
          tiempo_spot: 59,
          precio_segundo: 25.00
        },
        {
          tipo: 'SABADO',
          hora: {
            inicio: '06:30',
            fin: '09:00'
          },
          programa: 'Full pesca',
          dias: [],
          pases: 0,
          tiempo_spot: 59,
          precio_segundo: 25.00
        },
        {
          tipo: 'SABADO',
          hora: {
            inicio: '06:30',
            fin: '09:00'
          },
          programa: 'Sonso & marraqueta',
          dias: [
            {
              dia: 7,
              cantidad: 1
            }
          ],
          pases: 5,
          tiempo_spot: 59,
          precio_segundo: 25.00
        },
        {
          tipo: 'SABADO',
          hora: {
            inicio: '06:30',
            fin: '09:00'
          },
          programa: 'Sonso & marraqueta',
          dias: [
            {
              dia: 7,
              cantidad: 1
            }
          ],
          pases: 5,
          tiempo_spot: 59,
          precio_segundo: 25.00
        },
        {
          tipo: 'SABADO',
          hora: {
            inicio: '06:30',
            fin: '09:00'
          },
          programa: 'Full pesca',
          dias: [],
          pases: 0,
          tiempo_spot: 59,
          precio_segundo: 25.00
        },
        {
          tipo: 'DOMINGO',
          hora: {
            inicio: '06:30',
            fin: '09:00'
          },
          programa: 'Full pesca',
          dias: [],
          pases: 0,
          tiempo_spot: 59,
          precio_segundo: 25.00
        },
        {
          tipo: 'DOMINGO',
          hora: {
            inicio: '06:30',
            fin: '09:00'
          },
          programa: 'Full pesca',
          dias: [],
          pases: 0,
          tiempo_spot: 59,
          precio_segundo: 25.00
        },
        {
          tipo: 'DOMINGO',
          hora: {
            inicio: '06:30',
            fin: '09:00'
          },
          programa: 'Sonso & marraqueta',
          dias: [
            {
              dia: 8,
              cantidad: 1
            }
          ],
          pases: 7,
          tiempo_spot: 59,
          precio_segundo: 25.00
        },{
          tipo: 'DOMINGO',
          hora: {
            inicio: '06:30',
            fin: '09:00'
          },
          programa: 'Sonso & marraqueta',
          dias: [
            {
              dia: 8,
              cantidad: 1
            }
          ],
          pases: 7,
          tiempo_spot: 59,
          precio_segundo: 25.00
        }
      ]
    }
  };

  let tipos = {
    'LUN-VIE': 0,
    'SABADO': 0,
    'DOMINGO': 0
  };

  let total = [];
  let totalPases = 0;
  data.detalle.items.map(item => {
    tipos[item.tipo]++;
    item.dias = setDias(item.dias, length);
    total = totales(item.dias, total);
    totalPases += item.pases;
    return item;
  });
  let tipo = '';
  data.detalle.items.map(item => {
    if (item.tipo !== tipo) {
      tipo = item.tipo;
      item.rowspan = tipos[tipo];
    }
    setClass(item.dias, total);
    return item;
  });
  data.tipos = tipos;
  data.total = {
    items: total,
    pases: totalPases
  };
  
  let salida = render('orden-publicitaria.html', data);
  res.send(salida);
});

function totales (items, total) {
  if (total.length === 0) {
    let array = [];
    for (let i in items) {
      array.push({
        dia: items[i].dia,
        cantidad: items[i].cantidad ? items[i].cantidad : 0
      });
    }
    total = array;
  } else {
    for (let i in total) {
      total[i].cantidad += items[i].cantidad ? parseInt(items[i].cantidad) : 0;
    }
  }
  return total;
}

function render (file, data) {
  let source = fs.readFileSync(file, 'utf-8');
  let template = handlebars.compile(source);
  return template(data);
}

function getDias(mes, gestion, length) {
  let meses = [];
  for (let i = 0; i < length; i++) {
    let date = new Date(gestion, mes - 1, i + 1);
    meses.push({
      dia: i + 1,
      literal: dias[date.getDay()]
    });
  }
  return meses;
}

function setDias(items, length) {
  let array = [];
  for (let i = 0; i < length; i++) {
    array.push({
      dia: i + 1,
      cantidad: obtenerCantidad(i + 1, items)
    });
  }
  return array;
}

function setClass(items, total) {
  for (let i in total) {
    items[i].class = total[i].cantidad ? 'gray' : ''
  }
}

function obtenerCantidad(dia, items) {
  for (let i in items) {
    if (items[i].dia === dia) {
      return items[i].cantidad;
    }
  }
  return '';
}

function diasMes (month, year) {
  return new Date(year, month, 0).getDate();
}

app.listen(port);
console.log(`Escuchando en el puerto: ${port}`);
