
-- Función para comparar el costo de una lista de productos en diferentes comercios
CREATE OR REPLACE FUNCTION comparar_carrito(p_product_ids UUID[])
RETURNS TABLE (
    comercio_id UUID,
    comercio_nombre TEXT,
    comercio_logo TEXT,
    total_pagar DECIMAL,
    items_encontrados INT,
    items_faltantes INT,
    lista_faltantes TEXT[]
) AS $$
BEGIN
    RETURN QUERY
    WITH productos_solicitados AS (
        SELECT unnest(p_product_ids) AS product_id
    ),
    precios_por_comercio AS (
        SELECT 
            p.commerce_id,
            p.commerce_name,
            p.commerce_logo,
            p.product_id,
            p.price_ref
        FROM precios_actuales p
        WHERE p.product_id IN (SELECT product_id FROM productos_solicitados)
    ),
    agrupado AS (
        SELECT 
            commerce_id,
            commerce_name,
            commerce_logo,
            SUM(price_ref) as total,
            COUNT(DISTINCT product_id) as encontrados,
            (SELECT COUNT(*) FROM productos_solicitados) - COUNT(DISTINCT product_id) as faltantes
        FROM precios_por_comercio
        GROUP BY commerce_id, commerce_name, commerce_logo
    )
    SELECT 
        a.commerce_id,
        a.commerce_name,
        a.commerce_logo,
        a.total,
        a.encontrados,
        a.faltantes,
        ARRAY(
            SELECT ps.product_id::text 
            FROM productos_solicitados ps 
            WHERE ps.product_id NOT IN (
                SELECT product_id FROM precios_por_comercio pc WHERE pc.commerce_id = a.commerce_id
            )
        ) as lista_faltantes
    FROM agrupado a
    ORDER BY a.faltantes ASC, a.total ASC;
END;
$$ LANGUAGE plpgsql;
