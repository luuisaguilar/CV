+-----------------------------------------------------------------------+
| **Portfolio Three.js**                                                |
|                                                                       |
| Backlog de Mejoras + Architecture Decision Records                    |
|                                                                       |
| Luis Angel Aguilar · luisaguilaraguila.com · 2026                     |
+-----------------------------------------------------------------------+

**1. Introducción**

Este documento define el backlog priorizado de mejoras para luisaguilaraguila.com, construido con React, Three.js, Vite y Tailwind CSS. Cada item tiene justificación técnica y de negocio. Los ADRs documentan las decisiones de arquitectura, qué se cambia, por qué, y qué alternativas fueron descartadas.

+-----------------------------------------------------------------------------------+
| **Audiencia objetivo del portfolio**                                              |
|                                                                                   |
| Reclutadores técnicos y no técnicos en empresas de tecnología, SaaS y consultoría |
|                                                                                   |
| Clientes potenciales que buscan automatización de procesos y sistemas de negocio (descripción genérica; sin nombres reales)  |
|                                                                                   |
| Colaboradores técnicos que evalúan capacidades de arquitectura e implementación   |
+-----------------------------------------------------------------------------------+

**2. Análisis del estado actual**

**2.1 Fortalezas identificadas**

-   Diseño dark theme coherente con la identidad técnica del perfil

-   Stack tecnológico visible y relevante (React, Supabase, Next.js, n8n)

-   Sección de contacto completa con datos reales (email, LinkedIn, GitHub, ubicación)

-   Despliegue automático vía Cloudflare Pages con SSL y CDN global

-   Presencia de métricas en About y proyectos con hashtags de tecnología

**2.2 Problemas críticos**

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **PROBLEMA 1 --- Esfera Three.js genérica**                                                                                                                                      |
|                                                                                                                                                                                  |
| La IcosahedronGeometry con wireframe es el template más clonado en GitHub para portfolios tech. No comunica nada específico sobre el perfil de Business Systems + AI Automation. |
|                                                                                                                                                                                  |
| Impacto: pérdida de diferenciación visual en los primeros 3 segundos de visita.                                                                                                  |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **PROBLEMA 2 --- Sin post-processing (bloom)**                                                                                                             |
|                                                                                                                                                            |
| Sin bloom, chromatic aberration ni vignette, la escena se ve plana. El material brillante no sangra luz, señal clara de un Three.js básico vs profesional. |
|                                                                                                                                                            |
| Impacto: la escena parece una demo técnica, no un portfolio premium.                                                                                       |
+------------------------------------------------------------------------------------------------------------------------------------------------------------+

+---------------------------------------------------------------------------------------------------------------------------------+
| **PROBLEMA 3 --- Métricas débiles en About**                                                                                    |
|                                                                                                                                 |
| \'4+ Projects\', \'3+ Industries\', \'10+ Tools\' son números conservadores y no verificables. No transmiten credibilidad real. |
|                                                                                                                                 |
| Impacto: reducción de confianza en reclutadores que buscan experiencia demostrable.                                             |
+---------------------------------------------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------------------------------------------------------+
| **PROBLEMA 4 --- Proyectos sin links ni demos funcionales**                                                                       |
|                                                                                                                                   |
| LEC Platform y Nuxo aparecen sin enlace Live. Un reclutador que no puede ver el producto en acción pierde interés inmediatamente. |
|                                                                                                                                   |
| Impacto: tasa de conversión reducida en la sección más importante del portfolio.                                                  |
+-----------------------------------------------------------------------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **PROBLEMA 5 --- Sin sección de automatizaciones**                                                                                                                |
|                                                                                                                                                                   |
| n8n aparece como un badge entre otros pero no como evidencia de capacidad. La automatización es el diferenciador más fuerte del perfil y no tiene sección propia. |
|                                                                                                                                                                   |
| Impacto: la propuesta de valor más fuerte no está siendo comunicada.                                                                                              |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+--------------------------------------------------------------------------------------------------------------------------------------------------------+
| **PROBLEMA 6 --- Botón Send Me a Message sin acción funcional**                                                                                        |
|                                                                                                                                                        |
| Si el botón no abre formulario ni mailto: con asunto predefinido, los visitantes interesados rebotan. En mobile es el punto de conversión más crítico. |
|                                                                                                                                                        |
| Impacto: pérdida directa de leads calificados.                                                                                                         |
+--------------------------------------------------------------------------------------------------------------------------------------------------------+

**3. Backlog priorizado**

Ordenado por impacto/esfuerzo. Cada item incluye justificación del cambio.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **ID**                                                        **Título**                                          **Prioridad**   **Esfuerzo**   **Impacto**   **Sección**
  ------------------------------------------------------------- --------------------------------------------------- --------------- -------------- ------------- ----------------
  **Sprint 1 --- Quick wins (0--3 horas total)**

  **PF-01**                                                     Agregar bloom post-processing                       **Alta**        **Bajo**       ★★★★★         Hero / 3D

  **PF-02**                                                     Conectar botón Send Me a Message                    **Alta**        **Bajo**       ★★★★★         Contacto

  **PF-03**                                                     Reemplazar métricas genéricas con números reales    **Alta**        **Bajo**       ★★★★          About

  **PF-04**                                                     Cambiar acento de purple a electric cyan            **Media**       **Bajo**       ★★★           Global

  **PF-05**                                                     Cambiar fuente a Space Grotesk                      **Baja**        **Bajo**       ★★            Global

  **Sprint 2 --- Contenido y conversión (4--10 horas total)**

  **PF-06**                                                     Sección Automatizaciones con casos de uso           **Alta**        **Medio**      ★★★★★         Nueva sección

  **PF-07**                                                     Agregar previews/screenshots a proyectos            **Alta**        **Medio**      ★★★★          Proyectos

  **PF-08**                                                     Integrar Formspree para formulario de contacto      **Alta**        **Medio**      ★★★★          Contacto

  **PF-09**                                                     Reescribir hero con propuesta de valor específica   **Media**       **Medio**      ★★★★          Hero

  **PF-10**                                                     Toggle idioma ES/EN                                 **Media**       **Medio**      ★★★           Global

  **Sprint 3 --- Three.js avanzado (10--25 horas total)**

  **PF-11**                                                     Reemplazar esfera por grafo de nodos conectados     **Alta**        **Alto**       ★★★★★         Hero / 3D

  **PF-12**                                                     Shader procedural de fondo con parallax de mouse    **Media**       **Alto**       ★★★★          Hero / 3D

  **PF-13**                                                     Mouse parallax en cámara con lerp suave             **Media**       **Medio**      ★★★           Hero / 3D

  **Sprint 4 --- Scroll-driven 3D (15--30 horas total)**

  **PF-14**                                                     Scroll-driven: escena muta entre secciones          **Baja**        **Alto**       ★★★★          Global / 3D

  **PF-15**                                                     RenderTexture previews en cards de proyectos        **Baja**        **Alto**       ★★★           Proyectos / 3D
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**4. Detalle de items clave**

**PF-01 --- Bloom post-processing**

**Qué cambiar:**

Agregar \@react-three/postprocessing con Bloom (intensidad 1.5, threshold 0.3), ChromaticAberration y Vignette a la escena principal.

**Por qué:**

-   Sin bloom, los materiales brillantes se ven planos. Es el cambio de mayor impacto visual con menor código (\~15 líneas).

-   El bloom hace que edges y nodos sangran luz, transformando la percepción de calidad de amateur a premium.

-   ChromaticAberration da el look holográfico asociado con portfolios tech de alto nivel.

+------------------------------------------------------------------------------------------------------+
| **Código de implementación**                                                                         |
|                                                                                                      |
| import { EffectComposer, Bloom, ChromaticAberration, Vignette } from \'@react-three/postprocessing\' |
|                                                                                                      |
| \<EffectComposer\>                                                                                   |
|                                                                                                      |
| \<Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={1.5} /\>                        |
|                                                                                                      |
| \<ChromaticAberration offset={\[0.002, 0.002\]} /\>                                                  |
|                                                                                                      |
| \<Vignette eskil={false} offset={0.1} darkness={0.8} /\>                                             |
|                                                                                                      |
| \</EffectComposer\>                                                                                  |
|                                                                                                      |
| Tiempo estimado: 30 minutos. Impacto inmediato visible.                                              |
+------------------------------------------------------------------------------------------------------+

**PF-03 --- Métricas reales en About**

**Qué cambiar:**

Reemplazar \'4+ Projects\', \'3+ Industries\', \'10+ Tools\' por métricas verificables y específicas del trabajo real.

**Métricas sugeridas basadas en trabajo real:**

-   3 plataformas SaaS en producción

-   38 API routes migradas a enrichAudit() en LEC Platform

-   2 clientes activos ([CLIENTE REDACTADO], [CLIENTE REDACTADO])

-   12+ workflows de n8n operativos

**Por qué:**

-   Los números redondos con \'+\' son señal de falta de confianza. Los reclutadores los ignoran.

-   Números específicos como \'38 endpoints migrados\' son más impactantes y creíbles que \'10+ features\'.

**PF-06 --- Sección Automatizaciones**

**Qué agregar:**

Sección nueva entre Skills y Projects llamada \'Automatizaciones\' con 4 casos de uso reales como cards con capturas de n8n.

**Casos de uso a documentar:**

-   Reporte diario de mercados financieros vía Telegram --- trigger horario, scraping, Claude API, envío automático

-   Pipeline de importación CSV de pagos para LEC Platform --- validación, deduplicación, upsert con reporte de errores

-   Sistema de auditoría automática en 38 API routes --- withAuth interceptor con enrichAudit()

-   Monitor de disponibilidad con alertas --- webhook Cloudflare → n8n → Telegram

**IMPORTANTE: No exponer la URL [internal n8n production hostname redacted]. Mostrar screenshots del editor de workflows, no la URL de acceso.**

**PF-11 --- Grafo de nodos conectados**

**Qué cambiar:**

Reemplazar IcosahedronGeometry wireframe por un sistema de nodos interconectados con partículas viajando por los edges.

**Por qué:**

-   La esfera wireframe es el template más clonado. No comunica nada sobre el perfil de Business Systems + AI Automation.

-   Un grafo de nodos comunica directamente: sistemas, conexiones, automatización, flujo de datos.

-   Es visualmente más impresionante: nodos que pulsan, edges con partículas, reacción al hover.

**Arquitectura técnica:**

-   Nodos: SphereGeometry(0.08) con MeshStandardMaterial + emissive intensity pulsante via sine wave

-   Edges: TubeGeometry con CatmullRomCurve3 entre pares de nodos

-   Partículas: Points que viajan por los edges interpolando posición con lerp en el tiempo

-   Hover: raycasting → scale up + onda de luz propagada a nodos vecinos

-   Layout: algoritmo force-directed para posicionamiento natural

**5. Architecture Decision Records (ADR)**

Los ADRs documentan decisiones de diseño y arquitectura con impacto significativo.

+-----------------------------------------------------------------------+
| **ADR-001 --- Adoptar grafo de nodos en lugar de esfera wireframe**   |
|                                                                       |
| **Estado: Aprobado**                                                  |
+-----------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Contexto**                                                                                                                                                                                                                                                                       |
|                                                                                                                                                                                                                                                                                    |
| La escena hero usa IcosahedronGeometry con wireframe material, los mismos cubos flotantes y anillo orbital que se encuentran en cientos de portfolios Three.js en GitHub. El perfil proyectado es Business Systems + AI Automation y la esfera genérica no refuerza esa narrativa. |
|                                                                                                                                                                                                                                                                                    |
| **Decisión**                                                                                                                                                                                                                                                                       |
|                                                                                                                                                                                                                                                                                    |
| Reemplazar la esfera wireframe y elementos flotantes por un sistema de grafo de nodos interconectados con partículas viajando por los edges. La geometría comunica directamente redes, sistemas y flujo de información.                                                            |
|                                                                                                                                                                                                                                                                                    |
| **Justificación**                                                                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                                    |
| -   Diferenciación visual: el grafo no es un template, es una metáfora directa del perfil de negocio                                                                                                                                                                               |
|                                                                                                                                                                                                                                                                                    |
| -   Relevancia narrativa: \'sistemas conectados\' es la propuesta de valor central                                                                                                                                                                                                 |
|                                                                                                                                                                                                                                                                                    |
| -   Superioridad técnica demostrable: partículas y propagación al hover muestran dominio de Three.js más avanzado                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                                    |
| -   Escalabilidad: los nodos pueden representar proyectos reales con labels clickeables                                                                                                                                                                                            |
|                                                                                                                                                                                                                                                                                    |
| **Consecuencias**                                                                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                                    |
| -   Tiempo de desarrollo: 8-12 horas de implementación vs 0 horas para la esfera actual                                                                                                                                                                                            |
|                                                                                                                                                                                                                                                                                    |
| -   Complejidad de mantenimiento: sistema de partículas requiere optimización de performance en mobile                                                                                                                                                                             |
|                                                                                                                                                                                                                                                                                    |
| -   Dependencia de algoritmo force-directed para el layout del grafo                                                                                                                                                                                                               |
|                                                                                                                                                                                                                                                                                    |
| **Alternativas consideradas**                                                                                                                                                                                                                                                      |
|                                                                                                                                                                                                                                                                                    |
| -   Mantener la esfera actual con mejoras de material --- DESCARTADO: sigue siendo genérica visualmente                                                                                                                                                                            |
|                                                                                                                                                                                                                                                                                    |
| -   Usar animación de partículas tipo starfield --- DESCARTADO: también es template común en portfolios                                                                                                                                                                            |
|                                                                                                                                                                                                                                                                                    |
| -   Usar modelo 3D GLTF de circuito --- DESCARTADO: complejidad innecesaria, no alinea con el estilo del sitio                                                                                                                                                                     |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------+
| **ADR-002 --- Agregar bloom post-processing como primera mejora Three.js** |
|                                                                            |
| **Estado: Aprobado**                                                       |
+----------------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Contexto**                                                                                                                                                                                                                                         |
|                                                                                                                                                                                                                                                      |
| La escena carece de efectos de post-procesado. Los materiales con emissive no sangran luz, haciendo la escena plana independientemente de la calidad de la geometría. Es el indicador más claro que distingue un Three.js básico de uno profesional. |
|                                                                                                                                                                                                                                                      |
| **Decisión**                                                                                                                                                                                                                                         |
|                                                                                                                                                                                                                                                      |
| Integrar \@react-three/postprocessing con Bloom (intensidad 1.5, threshold 0.3), ChromaticAberration (offset 0.002) y Vignette (darkness 0.8) como primer cambio, antes de modificar la geometría.                                                   |
|                                                                                                                                                                                                                                                      |
| **Justificación**                                                                                                                                                                                                                                    |
|                                                                                                                                                                                                                                                      |
| -   Mayor impacto visual con menor esfuerzo: \~15 líneas de código, 30 minutos de implementación                                                                                                                                                     |
|                                                                                                                                                                                                                                                      |
| -   Funciona inmediatamente con la escena existente sin necesidad de refactorizar geometría                                                                                                                                                          |
|                                                                                                                                                                                                                                                      |
| -   Transforma la percepción de calidad de forma inmediata y verificable                                                                                                                                                                             |
|                                                                                                                                                                                                                                                      |
| -   Prepara el terreno para el grafo de nodos --- los edges brillarán correctamente con bloom activo                                                                                                                                                 |
|                                                                                                                                                                                                                                                      |
| **Consecuencias**                                                                                                                                                                                                                                    |
|                                                                                                                                                                                                                                                      |
| -   Incremento de carga en GPU: bloom es costoso en mobile --- mitigación: reducir intensidad en dispositivos móviles                                                                                                                                |
|                                                                                                                                                                                                                                                      |
| -   Algunos materiales existentes pueden necesitar ajuste de emissive para aprovechar el bloom correctamente                                                                                                                                         |
|                                                                                                                                                                                                                                                      |
| **Alternativas consideradas**                                                                                                                                                                                                                        |
|                                                                                                                                                                                                                                                      |
| -   Implementar bloom manualmente con render targets --- DESCARTADO: \@react-three/postprocessing lo abstrae correctamente                                                                                                                           |
|                                                                                                                                                                                                                                                      |
| -   No usar post-processing y mejorar solo los materiales --- DESCARTADO: impacto visual mínimo sin bloom                                                                                                                                            |
|                                                                                                                                                                                                                                                      |
| -   Usar THREE.UnrealBloomPass directamente --- DESCARTADO: menos ergonómico en el ecosistema R3F                                                                                                                                                    |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------+
| **ADR-003 --- Sección Automatizaciones con casos de uso, sin exponer URL de n8n** |
|                                                                                   |
| **Estado: Aprobado**                                                              |
+-----------------------------------------------------------------------------------+

+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Contexto**                                                                                                                                                                                               |
|                                                                                                                                                                                                            |
| El perfil tiene n8n operativo en producción en [internal n8n production hostname redacted]. La pregunta es cómo comunicar esta capacidad: link directo al subdominio, screenshots del editor, o descripción de casos de uso. |
|                                                                                                                                                                                                            |
| **Decisión**                                                                                                                                                                                               |
|                                                                                                                                                                                                            |
| Crear sección \'Automatizaciones\' con 4 casos de uso documentados como cards, incluyendo capturas del editor de workflows de n8n sin datos sensibles. NO publicar ni linkear la URL de acceso.            |
|                                                                                                                                                                                                            |
| **Justificación**                                                                                                                                                                                          |
|                                                                                                                                                                                                            |
| -   Seguridad: exponer la URL de n8n invita a intentos de acceso no autorizado, incluso con autenticación activa                                                                                           |
|                                                                                                                                                                                                            |
| -   Narrativa: los casos de uso comunican impacto de negocio mejor que una URL de herramienta                                                                                                              |
|                                                                                                                                                                                                            |
| -   Credibilidad: screenshots reales de workflows son evidencia de trabajo, no claims abstractos                                                                                                           |
|                                                                                                                                                                                                            |
| **Consecuencias**                                                                                                                                                                                          |
|                                                                                                                                                                                                            |
| -   Screenshots deben revisarse para no contener datos sensibles, nombres de clientes reales o credenciales                                                                                                |
|                                                                                                                                                                                                            |
| -   La sección necesita mantenimiento cuando los workflows cambien significativamente                                                                                                                      |
|                                                                                                                                                                                                            |
| **Alternativas consideradas**                                                                                                                                                                              |
|                                                                                                                                                                                                            |
| -   Link al subdominio n8n --- DESCARTADO: riesgo de seguridad, expone infraestructura interna                                                                                                             |
|                                                                                                                                                                                                            |
| -   Solo mencionar n8n como skill badge --- DESCARTADO: no diferencia del resto de skills en la lista                                                                                                      |
|                                                                                                                                                                                                            |
| -   Demo público de n8n con datos ficticios --- DESCARTADO: complejidad innecesaria para el valor que aporta                                                                                               |
+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **ADR-004 --- Formspree para contacto en lugar de mailto:**           |
|                                                                       |
| **Estado: Propuesto**                                                 |
+-----------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Contexto**                                                                                                                                                                                                         |
|                                                                                                                                                                                                                      |
| El botón \'Send Me a Message\' no tiene acción funcional definida. Las dos opciones principales son mailto: (abre cliente de correo del usuario) o Formspree (procesa el formulario y entrega al email sin backend). |
|                                                                                                                                                                                                                      |
| **Decisión**                                                                                                                                                                                                         |
|                                                                                                                                                                                                                      |
| Integrar Formspree con formulario inline (nombre, email, mensaje) en la sección de contacto. Mantener mailto: como fallback en el botón secundario.                                                                  |
|                                                                                                                                                                                                                      |
| **Justificación**                                                                                                                                                                                                    |
|                                                                                                                                                                                                                      |
| -   UX superior: el usuario no abandona el sitio para escribir el mensaje                                                                                                                                            |
|                                                                                                                                                                                                                      |
| -   Mobile-first: en iOS el mailto: abre Mail que muchos usuarios no configuran, generando abandono                                                                                                                  |
|                                                                                                                                                                                                                      |
| -   Tracking: Formspree tiene dashboard con historial de submissions                                                                                                                                                 |
|                                                                                                                                                                                                                      |
| -   Gratis hasta 50 submissions/mes --- suficiente para un portfolio personal                                                                                                                                        |
|                                                                                                                                                                                                                      |
| **Consecuencias**                                                                                                                                                                                                    |
|                                                                                                                                                                                                                      |
| -   Dependencia externa: si Formspree tiene outage, el formulario no funciona                                                                                                                                        |
|                                                                                                                                                                                                                      |
| -   Límite gratuito: 50 submissions/mes puede ser insuficiente con mucho tráfico orgánico                                                                                                                            |
|                                                                                                                                                                                                                      |
| **Alternativas consideradas**                                                                                                                                                                                        |
|                                                                                                                                                                                                                      |
| -   mailto: simple como única opción --- DESCARTADO: fricciona en mobile, sin tracking                                                                                                                               |
|                                                                                                                                                                                                                      |
| -   Backend propio con Resend --- DESCARTADO: excesiva complejidad para sitio estático en CF Pages                                                                                                                   |
|                                                                                                                                                                                                                      |
| -   Link a WhatsApp Business --- DESCARTADO: funciona en México pero no en contextos internacionales                                                                                                                 |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------+
| **ADR-005 --- Cambio de acento de purple a electric cyan**            |
|                                                                       |
| **Estado: Propuesto**                                                 |
+-----------------------------------------------------------------------+

+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Contexto**                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                               |
| El color de acento actual es un purple similar a #7c3aed. Este fue el color dominante en portfolios tech entre 2022-2024, popularizado por shadcn/ui y Tailwind. En 2026 es una señal visual de template, no de originalidad. |
|                                                                                                                                                                                                                               |
| **Decisión**                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                               |
| Migrar el acento primario a electric cyan (#00D4FF) y agregar amber (#F59E0B) como acento secundario para métricas y highlights. Mantener el dark background y paleta neutral.                                                |
|                                                                                                                                                                                                                               |
| **Justificación**                                                                                                                                                                                                             |
|                                                                                                                                                                                                                               |
| -   Diferenciación: pocos portfolios tech usan cyan en 2026, la mayoría sigue con purple/violet                                                                                                                               |
|                                                                                                                                                                                                                               |
| -   Coherencia semántica: el cyan evoca tecnología, datos, sistemas --- más alineado con el perfil                                                                                                                            |
|                                                                                                                                                                                                                               |
| -   Contraste: cyan sobre dark background tiene mayor ratio de contraste que purple                                                                                                                                           |
|                                                                                                                                                                                                                               |
| -   El amber como secundario crea tensión caliente/frío que añade sofisticación al diseño                                                                                                                                     |
|                                                                                                                                                                                                                               |
| **Consecuencias**                                                                                                                                                                                                             |
|                                                                                                                                                                                                                               |
| -   Cambio global: afecta navbar, botones, badges, links, borders --- requiere actualizar variables CSS y clases Tailwind                                                                                                     |
|                                                                                                                                                                                                                               |
| -   Algunas combinaciones pueden necesitar ajuste fino para accesibilidad (WCAG AA mínimo)                                                                                                                                    |
|                                                                                                                                                                                                                               |
| **Alternativas consideradas**                                                                                                                                                                                                 |
|                                                                                                                                                                                                                               |
| -   Mantener el purple actual --- DESCARTADO: señal de template en 2026                                                                                                                                                       |
|                                                                                                                                                                                                                               |
| -   Verde neón #00FF88 --- DESCARTADO: asociado con gaming más que con business systems                                                                                                                                       |
|                                                                                                                                                                                                                               |
| -   Azul estándar #2563EB --- DESCARTADO: genérico, sin personalidad diferenciadora                                                                                                                                           |
+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**6. Roadmap de implementación**

+---------------------------+----------------------------+-----------------------------+----------------------------+
| **Sprint 1 --- Semana 1** | **Sprint 2 --- Semana 2**  | **Sprint 3 --- Semana 3-4** | **Sprint 4 --- Mes 2**     |
|                           |                            |                             |                            |
| Quick wins (0-3h)         | Contenido (4-10h)          | Three.js (10-25h)           | Scroll-driven (15-30h)     |
+---------------------------+----------------------------+-----------------------------+----------------------------+
| -   PF-01 Bloom           | -   PF-06 Automatizaciones | -   PF-11 Grafo de nodos    | -   PF-14 Scroll-driven 3D |
|                           |                            |                             |                            |
| -   PF-02 Formulario      | -   PF-07 Previews         | -   PF-12 Shader fondo      | -   PF-15 RenderTexture    |
|                           |                            |                             |                            |
| -   PF-03 Métricas        | -   PF-08 Formspree        | -   PF-13 Mouse parallax    |                            |
|                           |                            |                             |                            |
| -   PF-04 Color           | -   PF-09 Hero copy        |                             |                            |
|                           |                            |                             |                            |
| -   PF-05 Fuente          | -   PF-10 ES/EN            |                             |                            |
+---------------------------+----------------------------+-----------------------------+----------------------------+

*Documento generado para luisaguilaraguila.com --- Marzo 2026*
