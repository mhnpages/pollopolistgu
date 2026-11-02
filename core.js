export const published = catalog => catalog.products.filter(p => p.publicationStatus === 'published');
export const normalize = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export const filterProducts = (products, category, query='') => products.filter(p => (category==='all'||p.category===category) && normalize(p.name+' '+p.components.join(' ')).includes(normalize(query)));
export const recommend = (products, occasion, style) => products.filter(p => p.tags.occasions.includes(occasion) && (style==='all'||p.tags.styles.includes(style))).slice(0,3);
export const validPrice = (p, today) => p.price?.status==='verified' && Number.isFinite(p.price.amount) && p.price.amount>0 && Boolean(p.price.validatedAt) && p.price.validatedAt<=today && (p.price.validUntil ? p.price.validUntil>=today : p.price.validity==='until-updated' && p.price.verificationSource==='owner-approved-menu' && Boolean(p.price.sourceId));
export const pricedVariants = (p,today) => (p.variants||[]).filter(v=>typeof v==='object'&&validPrice(v,today));
export const validPromotion = (p,today) => validPrice(p,today) && p.promotion?.status==='verified' && Boolean(p.photos.length) && p.promotion.startsAt<=today && p.promotion.endsAt>=today && Boolean(p.promotion.conditions) && Boolean(p.promotion.channels?.length || p.promotion.branchIds?.length);
export const validChannel = c => c.status==='verified' && c.validatedAt && /^https:\/\//.test(c.url) && ['pedidosya','maps','driveThrough'].includes(c.type);
