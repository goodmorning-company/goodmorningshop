import { Search, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/app/components/ProductCard';
import { TopProductCard } from '@/app/components/TopProductCard';
import { ProductDetail } from '@/app/components/ProductDetail';
import { AllCategories } from '@/app/components/AllCategories';
import { CategoryPage } from '@/app/components/CategoryPage';
import { SearchPage } from '@/app/components/SearchPage';
import { Checkout } from '@/app/components/Checkout';
import Slider from 'react-slick';
import { useState, useMemo } from 'react';

const categories = ['Todo', 'Novedades', 'Mujer', 'Hombre', 'Accesorios'];

const categoryAliasMap: Record<string, string> = {
  Women: 'Mujer',
  Men: 'Hombre',
  Accessories: 'Accesorios',
  Footwear: 'Calzado',
  Beauty: 'Beauty',
  Technology: 'Technology',
  Bags: 'Bags',
  'New In': 'Novedades',
  Todo: 'Todo',
};

const products = [
  // Women (10+ products)
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1622079400125-5b6679552976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwd29tYW4lMjBtb2RlbHxlbnwxfHx8fDE3Njk2NTc5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1622079400125-5b6679552976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwd29tYW4lMjBtb2RlbHxlbnwxfHx8fDE3Njk2NTc5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBmYXNoaW9uJTIwd29tYW4lMjBtb2RlbHxlbnwxfHx8fDE3Njk2NTc5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBmYXNoaW9uJTIwd29tYW4lMjBtb2RlbHxlbnwxfHx8fDE3Njk2NTc5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    name: 'Vestido de Seda de Noche',
    price: '$425',
    category: 'Mujer',
    description: 'Elegante vestido de noche de seda con un toque lujoso. Perfecto para ocasiones especiales, con una silueta favorecedora y tela premium que cae bellamente. Detalles acabados a mano y diseño atemporal.',
  },
  {
    id: 101,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1080',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1080',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=1080',
    ],
    name: 'Blusa de Satén Elegante',
    price: '$89',
    category: 'Mujer',
    description: 'Blusa de satén suave con diseño sofisticado. Perfecta para la oficina o eventos casuales. Tela transpirable y corte favorecedor que estiliza la figura.',
  },
  {
    id: 102,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1080',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1080',
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=1080',
    ],
    name: 'Falda Plisada Midi',
    price: '$125',
    category: 'Mujer',
    description: 'Falda midi plisada con movimiento fluido. Cintura alta que alarga la silueta. Disponible en varios colores, perfecta para cualquier temporada.',
  },
  {
    id: 103,
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=1080',
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=1080',
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=1080',
    ],
    name: 'Pantalones de Vestir Premium',
    price: '$165',
    category: 'Mujer',
    description: 'Pantalones de vestir de corte impecable. Tela de alta calidad con caída perfecta. Ideal para el trabajo o eventos formales.',
  },
  {
    id: 104,
    image: 'https://images.unsplash.com/photo-1509319117002-e66a7c0f45c5?w=1080',
    images: [
      'https://images.unsplash.com/photo-1509319117002-e66a7c0f45c5?w=1080',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1080',
    ],
    name: 'Abrigo de Lana Largo',
    price: '$385',
    category: 'Mujer',
    description: 'Abrigo largo de lana mezcla. Diseño clásico y elegante. Forro interior suave y bolsillos funcionales. Perfecto para el invierno.',
  },
  {
    id: 105,
    image: 'https://images.unsplash.com/photo-1612828961522-f3d97d520eba?w=1080',
    images: [
      'https://images.unsplash.com/photo-1612828961522-f3d97d520eba?w=1080',
      'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=1080',
    ],
    name: 'Traje de Dos Piezas',
    price: '$395',
    category: 'Mujer',
    description: 'Conjunto de chaqueta y pantalón a juego. Corte moderno y sofisticado. Tela de alta calidad que mantiene su forma. Ideal para la mujer profesional.',
  },
  {
    id: 106,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1080',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1080',
      'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=1080',
    ],
    name: 'Camisa de Lino Blanca',
    price: '$95',
    category: 'Mujer',
    description: 'Camisa de lino 100% natural. Fresca y transpirable para el verano. Diseño minimalista que combina con todo. Fácil de cuidar.',
  },
  {
    id: 107,
    image: 'https://images.unsplash.com/photo-1609873814058-a8928924184a?w=1080',
    images: [
      'https://images.unsplash.com/photo-1609873814058-a8928924184a?w=1080',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=1080',
    ],
    name: 'Vestido Camisero Estampado',
    price: '$145',
    category: 'Mujer',
    description: 'Vestido camisero con estampado floral. Largo midi versátil. Cinturón incluido para ajustar la cintura. Perfecto para primavera y verano.',
  },
  {
    id: 108,
    image: 'https://images.unsplash.com/photo-1564257787-6ffd2e286be3?w=1080',
    images: [
      'https://images.unsplash.com/photo-1564257787-6ffd2e286be3?w=1080',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1080',
    ],
    name: 'Jersey de Cashmere',
    price: '$285',
    category: 'Mujer',
    description: 'Jersey de cashmere ultrasuave. Cuello redondo clásico. Mantiene el calor sin añadir volumen. Una inversión que dura años.',
  },
  {
    id: 109,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=1080',
    images: [
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=1080',
      'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=1080',
    ],
    name: 'Chaleco de Punto Fino',
    price: '$115',
    category: 'Mujer',
    description: 'Chaleco de punto fino sin mangas. Ideal para capas. Diseño atemporal que nunca pasa de moda. Disponible en colores neutros.',
  },

  // Footwear (10+ products)
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc25lYWtlcnMlMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY5NjA3NDk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc25lYWtlcnMlMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY5NjA3NDk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3aGl0ZSUyMHNuZWFrZXJzfGVufDF8fHx8MTc2OTczMTU1MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx3aGl0ZSUyMHNuZWFrZXJzfGVufDF8fHx8MTc2OTczMTU1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    name: 'Zapatillas de Cuero Premium',
    price: '$189',
    category: 'Calzado',
    description: 'Elaboradas con cuero italiano premium, estas zapatillas combinan comodidad y estilo. Plantillas acolchadas y diseño versátil. Construcción duradera garantizada.',
  },
  {
    id: 201,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1080',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1080',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=1080',
    ],
    name: 'Botas Chelsea Clásicas',
    price: '$245',
    category: 'Calzado',
    description: 'Botas Chelsea de cuero genuino. Diseño clásico y atemporal. Suela de goma antideslizante. Perfectas para cualquier temporada.',
  },
  {
    id: 202,
    image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1080',
    images: [
      'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1080',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=1080',
    ],
    name: 'Zapatos Oxford de Vestir',
    price: '$215',
    category: 'Calzado',
    description: 'Zapatos Oxford formales de cuero pulido. Suela de cuero cosida a mano. Acabado brillante elegante. Ideales para eventos formales.',
  },
  {
    id: 203,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1080',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1080',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=1080',
    ],
    name: 'Sandalias de Cuero Artesanales',
    price: '$125',
    category: 'Calzado',
    description: 'Sandalias hechas a mano con cuero natural. Plantilla contorneada para mayor comodidad. Diseño minimalista y elegante. Perfectas para el verano.',
  },
  {
    id: 204,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=1080',
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=1080',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1080',
    ],
    name: 'Botines de Tacón Alto',
    price: '$295',
    category: 'Calzado',
    description: 'Botines elegantes con tacón de aguja. Cierre lateral con cremallera. Material de gamuza suave. Añaden altura y sofisticación a cualquier look.',
  },
  {
    id: 205,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1080',
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1080',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1080',
    ],
    name: 'Zapatillas Deportivas Running',
    price: '$155',
    category: 'Calzado',
    description: 'Zapatillas técnicas para correr. Amortiguación reactiva y malla transpirable. Suela con agarre superior. Ligereza y soporte estructural.',
  },
  {
    id: 206,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=1080',
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=1080',
      'https://images.unsplash.com/photo-1572635196243-4dd75fbdbd7f?w=1080',
    ],
    name: 'Mocasines de Ante',
    price: '$185',
    category: 'Calzado',
    description: 'Mocasines casuales de ante suave. Suela de goma flexible. Forro interior acolchado. Perfectos para un look casual-elegante.',
  },
  {
    id: 207,
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=1080',
    images: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=1080',
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=1080',
    ],
    name: 'Bailarinas de Charol',
    price: '$135',
    category: 'Calzado',
    description: 'Bailarinas clásicas de charol. Diseño plano cómodo para todo el día. Lazo decorativo. Elegancia y comodidad combinadas.',
  },
  {
    id: 208,
    image: 'https://images.unsplash.com/photo-1582897085656-c6d3b07cfb0f?w=1080',
    images: [
      'https://images.unsplash.com/photo-1582897085656-c6d3b07cfb0f?w=1080',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=1080',
    ],
    name: 'Botas de Montaña Premium',
    price: '$325',
    category: 'Calzado',
    description: 'Botas resistentes para senderismo. Impermeables y transpirables. Soporte de tobillo reforzado. Suela Vibram de alta tracción.',
  },
  {
    id: 209,
    image: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1080',
    images: [
      'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1080',
      'https://images.unsplash.com/photo-1494955464529-790512c65305?w=1080',
    ],
    name: 'Alpargatas de Esparto',
    price: '$75',
    category: 'Calzado',
    description: 'Alpargatas tradicionales con suela de esparto. Lona transpirable. Perfectas para el verano. Comodidad y estilo mediterráneo.',
  },

  // Accessories (10+ products)
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1758887953059-ca6f8e454207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd2F0Y2glMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3Njk2NTgwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1758887953059-ca6f8e454207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd2F0Y2h8ZW58MXx8fHwxNzY5NzMxNTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtaW5pbWFsaXN0JTIwd2F0Y2h8ZW58MXx8fHwxNzY5NzMxNTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1533139502609-28e99cd75d63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtaW5pbWFsaXN0JTIwd2F0Y2h8ZW58MXx8fHwxNzY5NzMxNTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtaW5pbWFsaXN0JTIwd2F0Y2h8ZW58MXx8fHwxNzY5NzMxNTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    name: 'Reloj Minimalista',
    price: '$299',
    category: 'Accesorios',
    description: 'Un reloj que encarna simplicidad y elegancia. Movimiento de cuarzo japonés para precisión. Resistente al agua y cristal de zafiro antiarañazos.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1596552639068-99bd471b579c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhhbmRiYWclMjBsZWF0aGVyfGVufDF8fHx8MTc2OTYzMDMyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1596552639068-99bd471b579c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhhbmRiYWclMjBsZWF0aGVyfGVufDF8fHx8MTc2OTYzMDMyOXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsZWF0aGVyJTIwaGFuZGJhZ3xlbnwxfHx8fDE3Njk3MzE2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1564222195116-8df6152a1a88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsZWF0aGVyJTIwaGFuZGJhZ3xlbnwxfHx8fDE3Njk3MzE2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxsZWF0aGVyJTIwaGFuZGJhZ3xlbnwxfHx8fDE3Njk3MzE2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1566150905588-dfcbb1b46aab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxsZWF0aGVyJTIwaGFuZGJhZ3xlbnwxfHx8fDE3Njk3MzE2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    name: 'Bolso de Cuero de Diseñador',
    price: '$650',
    category: 'Accesorios',
    description: 'Bolso de mano de lujo en cuero genuino. Múltiples compartimentos para organización. Herrajes dorados y silueta estructurada. Incluye correa desmontable.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1760446032732-c042b0d43580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3Njk2NTgwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1760446032732-c042b0d43580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3Njk2NTgwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzdW5nbGFzc2VzfGVufDF8fHx8MTc2OTczMTY2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzdW5nbGFzc2VzfGVufDF8fHx8MTc2OTczMTY2NXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    name: 'Gafas de Sol Modernas',
    price: '$145',
    category: 'Accesorios',
    description: 'Gafas de sol contemporáneas con protección UV400. Monturas de acetato ligeras. Lentes polarizadas que reducen el deslumbramiento. Diseño moderno.',
  },
  {
    id: 301,
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1080',
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1080',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1080',
    ],
    name: 'Bufanda de Cachemira',
    price: '$175',
    category: 'Accesorios',
    description: 'Bufanda de cachemira 100% pura. Increíblemente suave y cálida. Diseño versátil que combina con todo. Un accesorio esencial para el invierno.',
  },
  {
    id: 302,
    image: 'https://images.unsplash.com/photo-1587056169285-f7c8b6a3e49a?w=1080',
    images: [
      'https://images.unsplash.com/photo-1587056169285-f7c8b6a3e49a?w=1080',
      'https://images.unsplash.com/photo-1608447185069-f3da1bb7338c?w=1080',
    ],
    name: 'Cinturón de Cuero Italiano',
    price: '$125',
    category: 'Accesorios',
    description: 'Cinturón de cuero italiano genuino. Hebilla de metal pulido. Diseño clásico que nunca pasa de moda. Disponible en varios colores.',
  },
  {
    id: 303,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1080',
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1080',
      'https://images.unsplash.com/photo-1584119419307-dae3f1f0fc1a?w=1080',
    ],
    name: 'Cartera de Piel Minimalista',
    price: '$95',
    category: 'Accesorios',
    description: 'Cartera delgada de piel premium. Diseño minimalista con múltiples ranuras para tarjetas. Bloqueo RFID incorporado para seguridad.',
  },
  {
    id: 304,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1080',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1080',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1080',
    ],
    name: 'Sombrero Fedora de Fieltro',
    price: '$165',
    category: 'Accesorios',
    description: 'Sombrero fedora clásico de fieltro de lana. Banda de cuero ajustable. Añade un toque de elegancia a cualquier outfit.',
  },
  {
    id: 305,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1080',
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1080',
      'https://images.unsplash.com/photo-1611923134239-3f37afe86d80?w=1080',
    ],
    name: 'Pulsera de Cuero Trenzada',
    price: '$55',
    category: 'Accesorios',
    description: 'Pulsera de cuero genuino trenzado a mano. Cierre de acero inoxidable. Diseño unisex casual-elegante. Ajustable.',
  },
  {
    id: 306,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1080',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1080',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1080',
    ],
    name: 'Pendientes de Oro Blanco',
    price: '$385',
    category: 'Accesorios',
    description: 'Pendientes elegantes de oro blanco de 18k. Diseño minimalista y atemporal. Perfectos para uso diario o eventos especiales.',
  },
  {
    id: 307,
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=1080',
    images: [
      'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=1080',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1080',
    ],
    name: 'Mochila de Lona Premium',
    price: '$195',
    category: 'Accesorios',
    description: 'Mochila de lona resistente con detalles de cuero. Compartimento para laptop acolchado. Múltiples bolsillos organizadores. Perfecta para el día a día.',
  },

  // Beauty (10+ products)
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1719175936556-dbd05e415913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc2OTYwOTE0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1719175936556-dbd05e415913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc2OTYwOTE0NHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc2OTczMTY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc2OTczMTY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    name: 'Fragancia Exclusiva',
    price: '$195',
    category: 'Beauty',
    description: 'Una fragancia exclusiva con notas de bergamota, jazmín y sándalo. Fórmula duradera con mezcla sofisticada. Presentado en un elegante frasco.',
  },
  {
    id: 401,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1080',
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1080',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=1080',
    ],
    name: 'Sérum Facial Vitamina C',
    price: '$85',
    category: 'Beauty',
    description: 'Sérum facial con vitamina C pura. Ilumina y unifica el tono de piel. Fórmula antioxidante que combate los signos del envejecimiento.',
  },
  {
    id: 402,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1080',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1080',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1080',
    ],
    name: 'Crema Hidratante Facial',
    price: '$95',
    category: 'Beauty',
    description: 'Crema facial hidratante de lujo. Con ácido hialurónico y extractos botánicos. Textura ligera de rápida absorción. Para todo tipo de pieles.',
  },
  {
    id: 403,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1080',
    images: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1080',
      'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=1080',
    ],
    name: 'Mascarilla Detox Purificante',
    price: '$65',
    category: 'Beauty',
    description: 'Mascarilla facial de arcilla con carbón activado. Elimina impurezas y destapa poros. Deja la piel suave y revitalizada.',
  },
  {
    id: 404,
    image: 'https://images.unsplash.com/photo-1585120040315-68a34e903225?w=1080',
    images: [
      'https://images.unsplash.com/photo-1585120040315-68a34e903225?w=1080',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1080',
    ],
    name: 'Aceite Corporal Nutritivo',
    price: '$75',
    category: 'Beauty',
    description: 'Aceite corporal con mezcla de aceites naturales. Hidrata profundamente y deja la piel sedosa. Aroma relajante y terapéutico.',
  },
  {
    id: 405,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1080',
    images: [
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1080',
      'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=1080',
    ],
    name: 'Bálsamo Labial Hidratante',
    price: '$25',
    category: 'Beauty',
    description: 'Bálsamo labial con manteca de karité y vitamina E. Protege y suaviza los labios. Fórmula no pegajosa de larga duración.',
  },
  {
    id: 406,
    image: 'https://images.unsplash.com/photo-1583241800698-c6fb1d06e7d1?w=1080',
    images: [
      'https://images.unsplash.com/photo-1583241800698-c6fb1d06e7d1?w=1080',
      'https://images.unsplash.com/photo-1580870069867-74c57ee8f966?w=1080',
    ],
    name: 'Exfoliante Corporal de Azúcar',
    price: '$55',
    category: 'Beauty',
    description: 'Exfoliante suave de azúcar y aceites esenciales. Elimina células muertas y revela piel más suave. Aroma delicioso y natural.',
  },
  {
    id: 407,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1080',
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1080',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1080',
    ],
    name: 'Contorno de Ojos Anti-Edad',
    price: '$115',
    category: 'Beauty',
    description: 'Crema de contorno de ojos con péptidos. Reduce ojeras y líneas finas. Textura ligera que no irrita. Resultados visibles en semanas.',
  },
  {
    id: 408,
    image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=1080',
    images: [
      'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=1080',
      'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=1080',
    ],
    name: 'Spray Fijador de Maquillaje',
    price: '$45',
    category: 'Beauty',
    description: 'Spray fijador de larga duración. Mantiene el maquillaje perfecto todo el día. Fórmula ligera que no apelmaza. Acabado natural.',
  },
  {
    id: 409,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1080',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1080',
      'https://images.unsplash.com/photo-1585838964775-0cc19ae266ec?w=1080',
    ],
    name: 'Desmaquillante Bifásico',
    price: '$35',
    category: 'Beauty',
    description: 'Desmaquillante bifásico para rostro y ojos. Elimina maquillaje waterproof sin esfuerzo. No deja residuos grasos. Suave con la piel.',
  },

  // Audio (10+ products)
  {
    id: 501,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1080',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1080',
      'https://images.unsplash.com/photo-1545127398-14699f92334b?w=1080',
    ],
    name: 'Auriculares Premium Inalámbricos',
    price: '$349',
    category: 'Audio',
    description: 'Auriculares inalámbricos con sonido de estudio. Cancelación activa de ruido. Batería de 30 horas. Materiales premium y diseño ergonómico.',
  },
  {
    id: 502,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1080',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1080',
      'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=1080',
    ],
    name: 'Auriculares In-Ear Deportivos',
    price: '$125',
    category: 'Audio',
    description: 'Auriculares deportivos resistentes al agua. Ajuste seguro para entrenamientos intensos. Sonido potente con bajos profundos. Batería de 8 horas.',
  },
  {
    id: 503,
    image: 'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=1080',
    images: [
      'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=1080',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1080',
    ],
    name: 'Altavoz Bluetooth Portátil',
    price: '$195',
    category: 'Audio',
    description: 'Altavoz portátil con sonido 360 grados. Resistente al agua IP67. Batería de 12 horas. Diseño compacto y potente.',
  },
  {
    id: 504,
    image: 'https://images.unsplash.com/photo-1615875221248-d0ce5cc1bd3d?w=1080',
    images: [
      'https://images.unsplash.com/photo-1615875221248-d0ce5cc1bd3d?w=1080',
      'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=1080',
    ],
    name: 'Micr��fono de Condensador USB',
    price: '$175',
    category: 'Audio',
    description: 'Micrófono USB profesional para streaming y podcasting. Calidad de estudio cristalina. Patrón cardioide. Incluye soporte ajustable.',
  },
  {
    id: 505,
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=1080',
    images: [
      'https://images.unsplash.com/photo-1545127398-14699f92334b?w=1080',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1080',
    ],
    name: 'Auriculares de Estudio Profesionales',
    price: '$285',
    category: 'Audio',
    description: 'Auriculares de monitorización profesional. Respuesta de frecuencia plana. Comodidad para sesiones largas. Cable desmontable.',
  },
  {
    id: 506,
    image: 'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=1080',
    images: [
      'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=1080',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1080',
    ],
    name: 'Barra de Sonido Smart',
    price: '$425',
    category: 'Audio',
    description: 'Barra de sonido inteligente con Dolby Atmos. Conectividad WiFi y Bluetooth. Subwoofer inalámbrico incluido. Sonido envolvente inmersivo.',
  },
  {
    id: 507,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1080',
    images: [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1080',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=1080',
    ],
    name: 'Auriculares Gaming RGB',
    price: '$165',
    category: 'Audio',
    description: 'Auriculares gaming con sonido surround 7.1. Iluminación RGB personalizable. Micrófono retráctil con cancelación de ruido. Comodidad extrema.',
  },
  {
    id: 508,
    image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=1080',
    images: [
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=1080',
      'https://images.unsplash.com/photo-1619641805634-427e8e31d3bc?w=1080',
    ],
    name: 'Reproductor de Vinilo Vintage',
    price: '$495',
    category: 'Audio',
    description: 'Tocadiscos de vinilo con diseño retro. Salida USB para digitalizar. Altavoces estéreo integrados. Tres velocidades de reproducción.',
  },
  {
    id: 509,
    image: 'https://images.unsplash.com/photo-1563302111-eab3b9e6d50a?w=1080',
    images: [
      'https://images.unsplash.com/photo-1563302111-eab3b9e6d50a?w=1080',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1080',
    ],
    name: 'Amplificador de Audio Hi-Fi',
    price: '$595',
    category: 'Audio',
    description: 'Amplificador estéreo de alta fidelidad. Potencia de 100W por canal. Entradas múltiples. Sonido cálido y detallado para audiófilos.',
  },
  {
    id: 510,
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=1080',
    images: [
      'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=1080',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1080',
    ],
    name: 'Auriculares Noise Cancelling',
    price: '$295',
    category: 'Audio',
    description: 'Auriculares con cancelación de ruido adaptativa. Modo transparencia para conversaciones. Batería de 20 horas. Plegables y portátiles.',
  },

  // Bags (10+ products)
  {
    id: 601,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1080',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1080',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1080',
    ],
    name: 'Mochila de Cuero de Diseñador',
    price: '$425',
    category: 'Bags',
    description: 'Mochila de cuero premium con estilo y funcionalidad. Compartimento acolchado para laptop. Bolsillos organizadores múltiples. Resistente al agua.',
  },
  {
    id: 602,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1080',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1080',
      'https://images.unsplash.com/photo-1564222195116-8df6152a1a88?w=1080',
    ],
    name: 'Bolso Tote de Lona',
    price: '$85',
    category: 'Bags',
    description: 'Bolso tote espacioso de lona duradera. Asas reforzadas de cuero. Perfecto para el día a día. Diseño minimalista y versátil.',
  },
  {
    id: 603,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1080',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1080',
      'https://images.unsplash.com/photo-1566150905588-dfcbb1b46aab?w=1080',
    ],
    name: 'Bolso Crossbody Pequeño',
    price: '$155',
    category: 'Bags',
    description: 'Bolso cruzado compacto de cuero suave. Correa ajustable. Compartimento principal con cremallera. Perfecto para salir con lo esencial.',
  },
  {
    id: 604,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=1080',
    images: [
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=1080',
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=1080',
    ],
    name: 'Maletín Ejecutivo de Cuero',
    price: '$495',
    category: 'Bags',
    description: 'Maletín profesional de cuero genuino. Compartimentos organizados. Cierre de combinación. Imagen elegante para el ejecutivo moderno.',
  },
  {
    id: 605,
    image: 'https://images.unsplash.com/photo-1564222195116-8df6152a1a88?w=1080',
    images: [
      'https://images.unsplash.com/photo-1564222195116-8df6152a1a88?w=1080',
      'https://images.unsplash.com/photo-1596552639068-99bd471b579c?w=1080',
    ],
    name: 'Bolso de Noche con Cadena',
    price: '$225',
    category: 'Bags',
    description: 'Elegante bolso de noche con cadena dorada. Tamaño compacto. Interior forrado en satén. Ideal para eventos formales y fiestas.',
  },
  {
    id: 606,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1080',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1080',
      'https://images.unsplash.com/photo-1682316967717-16b32a406559?w=1080',
    ],
    name: 'Mochila Deportiva Técnica',
    price: '$145',
    category: 'Bags',
    description: 'Mochila deportiva con compartimento ventilado. Resistente al agua. Múltiples bolsillos para organización. Perfecta para el gimnasio.',
  },
  {
    id: 607,
    image: 'https://images.unsplash.com/photo-1566150905588-dfcbb1b46aab?w=1080',
    images: [
      'https://images.unsplash.com/photo-1566150905588-dfcbb1b46aab?w=1080',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1080',
    ],
    name: 'Bolso Hobo de Ante',
    price: '$265',
    category: 'Bags',
    description: 'Bolso hobo de ante suave. Diseño relajado y bohemio. Correa ajustable. Interior espacioso con bolsillo con cremallera.',
  },
  {
    id: 608,
    image: 'https://images.unsplash.com/photo-1582897085656-c6d3b07cfb0f?w=1080',
    images: [
      'https://images.unsplash.com/photo-1582897085656-c6d3b07cfb0f?w=1080',
      'https://images.unsplash.com/photo-1622560481650-e4d738e90902?w=1080',
    ],
    name: 'Riñonera de Cuero Moderna',
    price: '$95',
    category: 'Bags',
    description: 'Riñonera de cuero de diseño contemporáneo. Correa ajustable para cintura o crossbody. Compacta pero espaciosa. Tendencia y funcionalidad.',
  },
  {
    id: 609,
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=1080',
    images: [
      'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=1080',
      'https://images.unsplash.com/photo-1610986603166-f78428624e76?w=1080',
    ],
    name: 'Bolsa de Viaje Plegable',
    price: '$125',
    category: 'Bags',
    description: 'Bolsa de viaje ligera y plegable. Material resistente al desgarro. Se pliega en bolsillo propio. Ideal para viajes y excursiones.',
  },
  {
    id: 610,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=1080',
    images: [
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=1080',
      'https://images.unsplash.com/photo-1624797432677-6f803a98acb3?w=1080',
    ],
    name: 'Maleta de Cabina Rígida',
    price: '$285',
    category: 'Bags',
    description: 'Maleta de cabina con carcasa rígida. Ruedas giratorias 360 grados. Cerradura TSA integrada. Ligera y duradera para viajes frecuentes.',
  },

  // Technology (10+ products)
  {
    id: 701,
    image: 'https://images.unsplash.com/photo-1611099144078-5596e87ef54c?w=1080',
    images: [
      'https://images.unsplash.com/photo-1611099144078-5596e87ef54c?w=1080',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1080',
    ],
    name: 'Reloj Inteligente de Lujo',
    price: '$599',
    category: 'Technology',
    description: 'Smartwatch de lujo con seguimiento de salud. Pantalla AMOLED impresionante. Materiales premium con cristal de zafiro y caja de titanio. Resistente al agua 50m.',
  },
  {
    id: 702,
    image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=1080',
    images: [
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=1080',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=1080',
    ],
    name: 'Cargador Inalámbrico Rápido',
    price: '$65',
    category: 'Technology',
    description: 'Cargador inalámbrico de carga rápida. Compatible con todos los dispositivos Qi. Diseño elegante y delgado. Indicador LED discreto.',
  },
  {
    id: 703,
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=1080',
    images: [
      'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=1080',
      'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=1080',
    ],
    name: 'Soporte para Laptop Ergonómico',
    price: '$85',
    category: 'Technology',
    description: 'Soporte ajustable para laptop de aluminio. Mejora la postura y ventilación. Compatible con laptops de 10-17 pulgadas. Portátil y plegable.',
  },
  {
    id: 704,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=1080',
    images: [
      'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=1080',
      'https://images.unsplash.com/photo-1623785880097-5b9049c6361e?w=1080',
    ],
    name: 'Teclado Mecánico RGB',
    price: '$175',
    category: 'Technology',
    description: 'Teclado mecánico gaming con switches táctiles. Retroiluminación RGB personalizable. Teclas programables. Construcción de aluminio premium.',
  },
  {
    id: 705,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1080',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1080',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=1080',
    ],
    name: 'Ratón Inalámbrico Ergonómico',
    price: '$95',
    category: 'Technology',
    description: 'Ratón ergonómico inalámbrico recargable. Sensor de alta precisión. Botones programables. Reduce la fatiga en muñeca.',
  },
  {
    id: 706,
    image: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=1080',
    images: [
      'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=1080',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1080',
    ],
    name: 'Webcam 4K Ultra HD',
    price: '$185',
    category: 'Technology',
    description: 'Webcam 4K con autofocus y corrección de luz. Micrófono estéreo integrado. Ideal para videoconferencias profesionales. Clip universal.',
  },
  {
    id: 707,
    image: 'https://images.unsplash.com/photo-1616353071855-2676f5e84ced?w=1080',
    images: [
      'https://images.unsplash.com/photo-1616353071855-2676f5e84ced?w=1080',
      'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=1080',
    ],
    name: 'Power Bank 20000mAh',
    price: '$75',
    category: 'Technology',
    description: 'Batería portátil de alta capacidad. Carga rápida PD y QC3.0. Dos puertos USB y un USB-C. Pantalla LED de nivel de batería.',
  },
  {
    id: 708,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=1080',
    images: [
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=1080',
      'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=1080',
    ],
    name: 'Hub USB-C Multipuerto',
    price: '$95',
    category: 'Technology',
    description: 'Hub USB-C con 7 puertos. HDMI 4K, USB 3.0, lector de tarjetas SD. Carcasa de aluminio. Plug and play, sin drivers.',
  },
  {
    id: 709,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1080',
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1080',
      'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=1080',
    ],
    name: 'Lámpara LED de Escritorio',
    price: '$125',
    category: 'Technology',
    description: 'Lámpara de escritorio LED inteligente. Temperatura de color ajustable. Control táctil y temporizador. Carga inalámbrica integrada.',
  },
  {
    id: 710,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1080',
    images: [
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1080',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1080',
    ],
    name: 'Rastreador de Fitness',
    price: '$145',
    category: 'Technology',
    description: 'Pulsera de actividad con monitor de frecuencia cardíaca. Seguimiento de sueño y pasos. Resistente al agua. Batería de 7 días.',
  },
];

const topProducts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoZWFkcGhvbmVzJTIwcHJvZHVjdHxlbnwxfHx8fDE3Njk2NTc3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoZWFkcGhvbmVzJTIwcHJvZHVjdHxlbnwxfHx8fDE3Njk2NTc3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1545127398-14699f92334b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxoZWFkcGhvbmVzfGVufDF8fHx8MTc2OTczMjU5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmVzfGVufDF8fHx8MTc2OTczMjU5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmVzfGVufDF8fHx8MTc2OTczMjU5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    name: 'Auriculares Premium Inalámbricos',
    price: '$349',
    category: 'Audio',
    rating: 4.8,
    reviews: 234,
    description: 'Experimenta sonido de calidad de estudio con estos auriculares inalámbricos premium. Cancelación activa de ruido. Batería de 30 horas. Materiales premium y diseño ergonómico.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1682316967717-16b32a406559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGJhY2twYWNrJTIwbGVhdGhlcnxlbnwxfHx8fDE3Njk3MzExMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1682316967717-16b32a406559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGJhY2twYWNrJTIwbGVhdGhlcnxlbnwxfHx8fDE3Njk3MzExMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsZWF0aGVyJTIwYmFja3BhY2t8ZW58MXx8fHwxNzY5NzMyNjUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsZWF0aGVyJTIwYmFja3BhY2t8ZW58MXx8fHwxNzY5NzMyNjUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    name: 'Mochila de Cuero de Diseñador',
    price: '$425',
    category: 'Bags',
    rating: 4.9,
    reviews: 187,
    description: 'Una mezcla perfecta de estilo y funcionalidad. Esta mochila de diseñador cuenta con construcción de cuero premium, compartimento acolchado para laptop y múltiples bolsillos organizadores.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1637437411826-bab0dc76a310?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcnVubmluZyUyMHNob2VzfGVufDF8fHx8MTc2OTczMTEwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1637437411826-bab0dc76a310?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcnVubmluZyUyMHNob2VzfGVufDF8fHx8MTc2OTczMTEwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxydW5uaW5nJTIwc2hvZXN8ZW58MXx8fHwxNzY5NzMyNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxydW5uaW5nJTIwc2hvZXN8ZW58MXx8fHwxNzY5NzMyNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxydW5uaW5nJTIwc2hvZXN8ZW58MXx8fHwxNzY5NzMyNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxydW5uaW5nJTIwc2hvZXN8ZW58MXx8fHwxNzY5NzMyNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    name: 'Zapatillas de Running de Alto Rendimiento',
    price: '$215',
    category: 'Footwear',
    rating: 4.7,
    reviews: 412,
    description: 'Diseñadas para el rendimiento con amortiguación reactiva y parte superior de malla transpirable. Patrón de tracción avanzado. Diseño ligero y estructura de soporte.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1611099144078-5596e87ef54c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzbWFydHdhdGNofGVufDF8fHx8MTc2OTYzMzczMXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1611099144078-5596e87ef54c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzbWFydHdhdGNofGVufDF8fHx8MTc2OTYzMzczMXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzbWFydHdhdGNofGVufDF8fHx8MTc2OTczMjczMnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzbWFydHdhdGNofGVufDF8fHx8MTc2OTczMjczMnww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    name: 'Reloj Inteligente de Lujo',
    price: '$599',
    category: 'Technology',
    rating: 4.9,
    reviews: 356,
    description: 'Mantente conectado con estilo con este smartwatch de lujo. Seguimiento de salud, notificaciones y pantalla AMOLED. Materiales premium con cristal de zafiro y caja de titanio.',
  },
];

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todo');
  const [viewingCategory, setViewingCategory] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [productFromSearch, setProductFromSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [productBeforeCheckout, setProductBeforeCheckout] = useState<any>(null);
  const [cameFromAllCategories, setCameFromAllCategories] = useState(false);

  const resetToHome = () => {
    setSelectedProduct(null);
    setShowAllCategories(false);
    setViewingCategory(null);
    setShowSearch(false);
    setShowCheckout(false);
    setActiveCategory('Todo');
    setProductFromSearch(false);
    setCameFromAllCategories(false);
  };

  // Check if current product is in cart
  const isProductInCart = (productId: number) => {
    return cartItems.some(item => item.id === productId);
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Calculate sorted categories based on product count
  const sortedCategories = useMemo(() => {
    const allItems = [...products, ...topProducts];
    const categoryCounts: Record<string, number> = {};
    
    // Count items per category
    allItems.forEach(item => {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });
    
    // Get unique categories and sort by count (descending)
    const uniqueCategories = Object.keys(categoryCounts).sort((a, b) => {
      return categoryCounts[b] - categoryCounts[a];
    });
    
    // Return with "Todo" and "Novedades" first, then sorted categories
    return ['Todo', 'Novedades', ...uniqueCategories];
  }, []);

  const categorySliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    variableWidth: true,
  };

  const topProductsSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto min-h-screen bg-white relative flex flex-col">
          {showCheckout && !selectedProduct && !showAllCategories && !viewingCategory && (
            <Checkout
              cartItems={cartItems}
              onClose={() => {
                setShowCheckout(false);
                // Return to product detail if it was opened from there
                if (productBeforeCheckout) {
                  setSelectedProduct(productBeforeCheckout);
                  setProductBeforeCheckout(null);
                  return;
                }
                resetToHome();
              }}
              onRemoveItem={handleRemoveFromCart}
            />
          )}

          {showSearch && !showAllCategories && !viewingCategory && !selectedProduct && (
            <SearchPage
              products={[...products, ...topProducts]}
              onClose={() => {
                setShowSearch(false);
                resetToHome();
              }}
              onProductClick={(product) => {
                setShowSearch(false);
                setSelectedProduct(product);
                setProductFromSearch(true);
              }}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
            />
          )}

          {showAllCategories && (
            <AllCategories
              onClose={() => {
                setShowAllCategories(false);
                resetToHome();
              }}
              onSelectCategory={(category) => {
                const targetCategory = categoryAliasMap[category] || category;
                setActiveCategory(targetCategory);
                setShowAllCategories(false);
                setCameFromAllCategories(true);
                if (targetCategory === 'Todo') {
                  setViewingCategory(null);
                  resetToHome();
                  return;
                }
                setViewingCategory(targetCategory);
              }}
            />
          )}

          {viewingCategory && !showAllCategories && (
            <CategoryPage
              category={viewingCategory}
              products={[...products, ...topProducts]}
              onClose={() => {
                if (cameFromAllCategories) {
                  setViewingCategory(null);
                  setShowAllCategories(true);
                  setCameFromAllCategories(false);
                  return;
                }
                setViewingCategory(null);
                resetToHome();
              }}
              onProductClick={(product) => {
                setViewingCategory(null);
                setSelectedProduct(product);
              }}
            />
          )}

          {selectedProduct && !showAllCategories && !viewingCategory && (
            <ProductDetail
              images={selectedProduct.images}
              name={selectedProduct.name}
              price={selectedProduct.price}
              description={selectedProduct.description}
              category={selectedProduct.category}
              productId={selectedProduct.id}
              onClose={() => {
                resetToHome();
              }}
              fromSearch={productFromSearch}
              onBackToSearch={() => {
                setSelectedProduct(null);
                setProductFromSearch(false);
                setShowSearch(true);
              }}
              onAddToCart={() => {
                setCartItems([...cartItems, selectedProduct]);
              }}
              cartCount={cartItems.length}
              isInCart={isProductInCart(selectedProduct.id)}
              onOpenCheckout={() => {
                setSelectedProduct(null);
                setProductFromSearch(false);
                setShowCheckout(true);
                setProductBeforeCheckout(selectedProduct);
              }}
              allProducts={[...products, ...topProducts]}
              onProductClick={(product) => {
                setSelectedProduct(product);
                setProductFromSearch(false);
              }}
            />
          )}
          
          {!selectedProduct && !showAllCategories && !viewingCategory && (
            <>
          {/* Header */}
          <header className="sticky top-0 bg-white/95 backdrop-blur-md z-20 px-4 sm:px-5 pt-8 pb-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h1 className="text-xl tracking-tight text-gray-900">Tienda de Abo</h1>
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 flex items-center justify-center" onClick={() => setShowSearch(true)}>
                  <Search className="w-5 h-5 text-gray-900" />
                </button>
                <button 
                  className="w-8 h-8 flex items-center justify-center relative"
                  onClick={() => setShowCheckout(true)}
                >
                  <ShoppingBag className="w-5 h-5 text-gray-900" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 text-white text-[10px] rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Categories */}
          <div className="px-4 sm:px-5 pt-4 pb-3 bg-[rgba(255,255,255,0.89)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-gray-900">Categorías</h2>
              <button className="text-sm text-gray-500" onClick={() => setShowAllCategories(true)}>
                Ver Todo
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {sortedCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    if (category === 'Todo') {
                      setViewingCategory(null);
                      return;
                    }
                    setViewingCategory(category);
                  }}
                  className={`px-5 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
                    activeCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Top Products Section */}
          <div className="px-4 sm:px-5 pb-6 pt-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-gray-900">Productos Destacados</h2>
              <button className="text-sm text-gray-500">Ver Todo</button>
            </div>
            <Slider {...topProductsSliderSettings}>
              {topProducts.map((product) => (
                <div key={product.id} className="pr-3">
                  <TopProductCard
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    reviews={product.reviews}
                    onClick={() => setSelectedProduct(product)}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Filter Bar */}
          <div className="px-4 sm:px-5 pb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {products.length} Productos
            </p>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <SlidersHorizontal className="w-4 h-4 text-gray-700" />
              <span className="text-sm text-gray-700">Filtrar</span>
            </button>
          </div>

          {/* Product Grid */}
          <div className="px-4 sm:px-5 pb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </div>
          </>
          )}
      </div>
    </div>
  );
}
