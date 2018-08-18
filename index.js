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
      } 
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
        }
      ]
    }
  };

  let tipos = {
    'LUN-VIE': 0,
    'SABADO': 0,
    'DOMINGO': 0
  };

  data.detalle.items.map(item => {
    tipos[item.tipo]++;
    item.dias = setDias(item.dias, length);
    return item;
  });
  data.tipos = tipos;

  let salida = render('orden-publicitaria.html', data);
  res.send(salida);
});

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
