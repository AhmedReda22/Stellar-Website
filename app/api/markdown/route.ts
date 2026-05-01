import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const accept = request.headers.get("accept") || "";

  if (!accept.includes("text/markdown")) {
    return NextResponse.json(
      { error: "Request text/markdown in Accept header" },
      { status: 406 },
    );
  }

  const markdown = `# Stellar Consulting MEA

## Healthcare Consultancy Agency

Stellar is a 360 healthcare consultancy firm providing integrated solutions across healthcare advertising, scientific communication, market access, and healthcare partnerships.

### Services
1. **Healthcare Advertising & Brand Engagement** - Creative campaigns for regulated healthcare audiences
2. **Medical Affairs & Communication Solutions** - Bridging clinical evidence with practical communication
3. **Market Access & Payer Strategy** - Evidence-based access strategies for MEA markets
4. **Health System Partnerships** - Sustainable collaborations with health systems
5. **Digital & Innovative Solutions** - Interactive platforms and digital tools

### Regional Presence
Operating in 8 countries: UAE, Saudi Arabia, Egypt, Kuwait, Qatar, Turkey, Lebanon, Jordan

### Contact
- UAE: +971-52-1159-551
- KSA: +966-5-0009-7842
- Egypt: +20-010-0644-3139
- Website: https://stellarmea.com
- Email: hello@stellarconsulting.com

### Partners
31+ active partners including AstraZeneca, Novartis, Pfizer, Roche, Takeda, Sanofi, and more.
`;

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(markdown.split(/\s+/).length),
    },
  });
}