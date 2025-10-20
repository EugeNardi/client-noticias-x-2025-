-- ═══════════════════════════════════════════════════════════════════
-- SCRIPT PARA INSERTAR NOTICIAS DE EJEMPLO
-- Ejecutar DESPUÉS de crear las tablas con supabase-setup.sql
-- ═══════════════════════════════════════════════════════════════════

-- IMPORTANTE: Primero debes subir las imágenes a Supabase Storage
-- O usar URLs públicas de imágenes

-- ───────────────────────────────────────────────────────────────────
-- NOTICIAS DE TECNOLOGÍA
-- ───────────────────────────────────────────────────────────────────

INSERT INTO posts (title, summary, content, cover, author, category) VALUES
(
  'Inteligencia Artificial revoluciona la medicina moderna',
  'Nuevos algoritmos de IA permiten detectar enfermedades con mayor precisión que los métodos tradicionales.',
  '<p>La inteligencia artificial está transformando el campo de la medicina de maneras que hace apenas unos años parecían imposibles. Investigadores de todo el mundo están desarrollando algoritmos capaces de detectar enfermedades en etapas tempranas con una precisión sin precedentes.</p><p>Estos sistemas de IA pueden analizar millones de imágenes médicas en segundos, identificando patrones que podrían pasar desapercibidos para el ojo humano. Desde la detección temprana del cáncer hasta el diagnóstico de enfermedades raras, la IA está salvando vidas.</p><p>Los expertos predicen que en los próximos años, la IA será una herramienta estándar en hospitales y clínicas de todo el mundo.</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  'Dr. María González',
  'Tecnología'
),
(
  'Nuevo smartphone plegable rompe récords de ventas',
  'El último dispositivo de la marca líder en tecnología supera todas las expectativas del mercado.',
  '<p>La industria tecnológica está en auge con el lanzamiento del nuevo smartphone plegable que ha capturado la atención de consumidores de todo el mundo. Con un diseño innovador y características de vanguardia, este dispositivo está redefiniendo lo que esperamos de nuestros teléfonos móviles.</p><p>Entre sus características destacadas se encuentran una pantalla OLED de 7.6 pulgadas cuando está desplegado, procesador de última generación, y una batería que promete durar todo el día incluso con uso intensivo.</p><p>Los analistas de mercado predicen que este lanzamiento marcará un antes y un después en la industria de los smartphones.</p>',
  'https://images.unsplash.com/photo-1592286927505-c7c6f0e5b7e9?w=800',
  'Carlos Rodríguez',
  'Tecnología'
),
(
  'Computación cuántica: El futuro ya está aquí',
  'Científicos logran un avance significativo en la estabilidad de qubits, acercándonos a la era cuántica.',
  '<p>Un equipo internacional de científicos ha logrado un avance revolucionario en computación cuántica que podría cambiar el mundo tal como lo conocemos. El descubrimiento permite mantener qubits estables durante períodos mucho más largos, un obstáculo que había limitado el desarrollo de computadoras cuánticas prácticas.</p><p>Las computadoras cuánticas prometen resolver problemas que son imposibles para las computadoras tradicionales, desde el desarrollo de nuevos medicamentos hasta la optimización de sistemas complejos.</p><p>Este avance nos acerca significativamente a un futuro donde la computación cuántica será una realidad cotidiana.</p>',
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
  'Dr. Roberto Sánchez',
  'Tecnología'
);

-- ───────────────────────────────────────────────────────────────────
-- NOTICIAS DE CIENCIA
-- ───────────────────────────────────────────────────────────────────

INSERT INTO posts (title, summary, content, cover, author, category) VALUES
(
  'Descubren nueva especie de dinosaurio en la Patagonia',
  'Paleontólogos argentinos encuentran restos fósiles de un dinosaurio herbívoro gigante de hace 90 millones de años.',
  '<p>Un equipo de paleontólogos argentinos ha realizado un descubrimiento extraordinario en la Patagonia: los restos fósiles de una nueva especie de dinosaurio herbívoro que vivió hace aproximadamente 90 millones de años.</p><p>El dinosaurio, que ha sido nombrado Patagotitan mayorum, habría medido más de 37 metros de largo y pesado alrededor de 77 toneladas, convirtiéndolo en uno de los animales terrestres más grandes que jamás haya existido.</p><p>Este hallazgo proporciona nueva información valiosa sobre la evolución de los dinosaurios y el ecosistema del período Cretácico.</p>',
  'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800',
  'Dra. Laura Martínez',
  'Ciencia'
),
(
  'Telescopio James Webb captura imágenes sin precedentes del universo',
  'Las nuevas imágenes revelan galaxias formadas poco después del Big Bang.',
  '<p>El Telescopio Espacial James Webb continúa asombrando a la comunidad científica con imágenes espectaculares del universo primitivo. Las últimas fotografías capturadas muestran galaxias que se formaron apenas 300 millones de años después del Big Bang.</p><p>Estas observaciones están revolucionando nuestra comprensión de cómo se formaron las primeras galaxias y estrellas en el universo. Los científicos están descubriendo que las galaxias primitivas eran mucho más complejas de lo que se pensaba anteriormente.</p><p>El telescopio seguirá explorando los confines del universo, prometiendo más descubrimientos revolucionarios en los próximos años.</p>',
  'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800',
  'Dr. Miguel Fernández',
  'Ciencia'
),
(
  'Científicos logran revertir el envejecimiento celular en ratones',
  'Un nuevo tratamiento experimental muestra resultados prometedores en la lucha contra el envejecimiento.',
  '<p>Investigadores de una universidad líder han logrado un avance significativo en la ciencia del envejecimiento. Mediante un tratamiento experimental, han conseguido revertir marcadores de envejecimiento en células de ratones, rejuveneciendo efectivamente sus tejidos.</p><p>El tratamiento se basa en la reprogramación celular parcial, una técnica que reactiva genes asociados con la juventud sin causar que las células pierdan su identidad especializada.</p><p>Aunque aún faltan años para aplicaciones en humanos, este descubrimiento abre nuevas posibilidades en la medicina regenerativa y el tratamiento de enfermedades relacionadas con la edad.</p>',
  'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800',
  'Dra. Ana López',
  'Ciencia'
);

-- ───────────────────────────────────────────────────────────────────
-- NOTICIAS DE FINANZAS
-- ───────────────────────────────────────────────────────────────────

INSERT INTO posts (title, summary, content, cover, author, category) VALUES
(
  'Criptomonedas: Bitcoin alcanza nuevo máximo histórico',
  'El precio de Bitcoin supera los $70,000 impulsado por la adopción institucional.',
  '<p>Bitcoin ha alcanzado un nuevo máximo histórico, superando la barrera de los $70,000 por primera vez en su historia. Este rally está impulsado principalmente por la creciente adopción institucional y el lanzamiento de nuevos fondos cotizados (ETFs) de Bitcoin.</p><p>Grandes instituciones financieras que antes eran escépticas ahora están incorporando criptomonedas en sus carteras de inversión. Analistas predicen que esta tendencia continuará a medida que más inversores buscan diversificar sus activos.</p><p>Sin embargo, expertos advierten sobre la volatilidad inherente del mercado cripto y recomiendan invertir solo lo que se puede permitir perder.</p>',
  'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800',
  'Juan Pérez',
  'Finanzas'
),
(
  'Mercados emergentes: Oportunidades de inversión en 2025',
  'Expertos identifican los mercados con mayor potencial de crecimiento para este año.',
  '<p>Los mercados emergentes están captando la atención de inversores globales en 2025. Países en Asia, África y América Latina están mostrando un crecimiento económico robusto y ofrecen oportunidades de inversión atractivas.</p><p>Sectores como tecnología, energías renovables y servicios financieros están experimentando un boom en estas regiones. La clase media en expansión y la digitalización acelerada están creando nuevos mercados y oportunidades de negocio.</p><p>Los analistas recomiendan diversificar las inversiones incluyendo exposición a estos mercados, aunque con una gestión cuidadosa del riesgo.</p>',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
  'Patricia Silva',
  'Finanzas'
),
(
  'Bancos centrales y la era de las monedas digitales',
  'Varios países avanzan en el desarrollo de sus propias monedas digitales respaldadas por el estado.',
  '<p>Los bancos centrales de todo el mundo están acelerando el desarrollo de monedas digitales de banco central (CBDC). China ya ha lanzado el yuan digital en varias ciudades, mientras que la Unión Europea y Estados Unidos están en fases avanzadas de investigación.</p><p>Estas monedas digitales prometen transacciones más rápidas, mayor inclusión financiera y mejor control de la política monetaria. Sin embargo, también plantean preguntas sobre privacidad y el futuro del efectivo físico.</p><p>Los expertos predicen que en la próxima década, las CBDCs podrían transformar fundamentalmente cómo interactuamos con el dinero.</p>',
  'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800',
  'Ricardo Morales',
  'Finanzas'
);

-- ───────────────────────────────────────────────────────────────────
-- NOTICIAS DEL CAMPO
-- ───────────────────────────────────────────────────────────────────

INSERT INTO posts (title, summary, content, cover, author, category) VALUES
(
  'Agricultura de precisión: Drones revolucionan el campo',
  'La tecnología de drones permite a los agricultores optimizar el uso de recursos y aumentar la productividad.',
  '<p>La agricultura de precisión está transformando el sector agrícola mediante el uso de drones y tecnología avanzada. Los agricultores ahora pueden monitorear sus cultivos desde el aire, identificando problemas de riego, plagas o enfermedades antes de que se conviertan en crisis.</p><p>Los drones equipados con cámaras multiespectrales pueden analizar la salud de las plantas, permitiendo aplicar fertilizantes y pesticidas solo donde se necesitan, reduciendo costos y el impacto ambiental.</p><p>Esta tecnología está haciendo la agricultura más sostenible y eficiente, ayudando a alimentar a una población mundial en crecimiento.</p>',
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
  'Ing. Jorge Ramírez',
  'Campo'
),
(
  'Ganadería sostenible: El futuro de la producción de carne',
  'Nuevas prácticas ganaderas reducen el impacto ambiental mientras mantienen la productividad.',
  '<p>La industria ganadera está adoptando prácticas más sostenibles para reducir su huella de carbono. Técnicas como el pastoreo rotativo, la integración de cultivos y ganado, y el uso de suplementos alimenticios innovadores están mostrando resultados prometedores.</p><p>Estas prácticas no solo benefician al medio ambiente, sino que también mejoran la calidad de la carne y la salud del ganado. Los consumidores están cada vez más interesados en productos de origen sostenible.</p><p>Los expertos predicen que la ganadería sostenible será el estándar de la industria en las próximas décadas.</p>',
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800',
  'Dra. Sofía Torres',
  'Campo'
),
(
  'Cultivos verticales: La agricultura urbana del futuro',
  'Granjas verticales en ciudades producen alimentos frescos usando 95% menos agua.',
  '<p>Las granjas verticales están emergiendo como una solución innovadora para la producción de alimentos en áreas urbanas. Estos sistemas de cultivo en interiores utilizan tecnología LED y hidroponía para cultivar vegetales y hierbas en espacios reducidos.</p><p>Las ventajas son numerosas: uso mínimo de agua, sin necesidad de pesticidas, producción durante todo el año, y alimentos frescos cerca de los consumidores. Además, estas granjas pueden instalarse en edificios abandonados, revitalizando áreas urbanas.</p><p>Aunque aún enfrentan desafíos de costos energéticos, la tecnología está mejorando rápidamente y podría ser clave para la seguridad alimentaria urbana.</p>',
  'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
  'Ing. Martín Díaz',
  'Campo'
);

-- ═══════════════════════════════════════════════════════════════════
-- SCRIPT COMPLETADO
-- ═══════════════════════════════════════════════════════════════════

-- VERIFICACIÓN:
-- Para ver las noticias insertadas, ejecuta:
-- SELECT id, title, category, author, created_at FROM posts ORDER BY created_at DESC;

-- NOTAS:
-- - Las imágenes usan URLs de Unsplash (servicio gratuito de imágenes)
-- - Puedes reemplazar estas URLs con imágenes de Supabase Storage
-- - Para subir imágenes a Supabase Storage:
--   1. Ve a Storage → covers
--   2. Sube las imágenes
--   3. Obtén la URL pública
--   4. Actualiza el campo 'cover' en los posts
