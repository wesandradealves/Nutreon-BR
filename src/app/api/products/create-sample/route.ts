import { NextResponse } from 'next/server';
import { nuvemshopClient } from '@/lib/nuvemshop-client';

export async function POST() {
  console.log('\n🏪 [BFF] Criando produtos de exemplo...');
  
  const sampleProducts = [
    {
      name: { pt: 'Whey Protein Isolado 1kg' },
      description: { pt: 'Proteína isolada de alta qualidade para ganho de massa muscular.' },
      variants: [
        {
          price: '189.90',
          stock: 100,
          weight: '1000'
        }
      ],
      categories: [],
      published: true
    },
    {
      name: { pt: 'Creatina Monohidratada 300g' },
      description: { pt: 'Creatina pura para aumento de força e desempenho.' },
      variants: [
        {
          price: '79.90',
          stock: 50,
          weight: '300'
        }
      ],
      categories: [],
      published: true
    },
    {
      name: { pt: 'BCAA 2:1:1 - 200g' },
      description: { pt: 'Aminoácidos de cadeia ramificada para recuperação muscular.' },
      variants: [
        {
          price: '65.90',
          stock: 75,
          weight: '200'
        }
      ],
      categories: [],
      published: true
    },
    {
      name: { pt: 'Multivitamínico Complete - 60 cápsulas' },
      description: { pt: 'Complexo vitamínico completo para saúde e imunidade.' },
      variants: [
        {
          price: '45.90',
          stock: 120,
          weight: '100'
        }
      ],
      categories: [],
      published: true
    }
  ];
  
  const created = [];
  const errors = [];
  
  for (const product of sampleProducts) {
    try {
      console.log(`📦 Criando: ${product.name.pt}...`);
      const result = await nuvemshopClient.post('/products', product);
      created.push(result);
      console.log(`✅ Criado com ID: ${result.id}`);
    } catch (error) {
      console.error(`❌ Erro ao criar ${product.name.pt}:`, error);
      errors.push({
        product: product.name.pt,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
  
  console.log(`\n📊 Resultado: ${created.length} produtos criados, ${errors.length} erros`);
  
  return NextResponse.json({
    success: true,
    created: created.length,
    errors: errors.length,
    products: created.map(p => ({
      id: p.id,
      name: p.name.pt,
      price: p.variants[0]?.price
    })),
    errorDetails: errors
  });
}