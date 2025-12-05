import id1 from '../../assets/identificacion/id1.webp';
import id2 from '../../assets/identificacion/id2.webp';
import id3 from '../../assets/identificacion/id3.webp';
import co1 from '../../assets/comprobante/co1.webp';
import co2 from '../../assets/comprobante/co2.webp';
import co3 from '../../assets/comprobante/co3.webp';
import es1 from '../../assets/propiedad/es1.webp';
import es2 from '../../assets/propiedad/es2.webp';
import es3 from '../../assets/propiedad/es3.webp';
import cn1 from '../../assets/contrato/cn1.webp';
import cn2 from '../../assets/contrato/cn2.webp';
import cn3 from '../../assets/contrato/cn3.webp';
import rf1 from '../../assets/contacto/rf1.webp';
import rf2 from '../../assets/contacto/rf2.webp';
import rf3 from '../../assets/contacto/rf3.webp';
import ft1 from '../../assets/fotografia/ft1.webp';
import ft2 from '../../assets/fotografia/ft2.webp';
import ft3 from '../../assets/fotografia/ft3.webp';
import type { TabType } from '../../types/form-types';

export interface MockImage {
    id: string;
    name: string;
    imageUrl: string;
    metadata: {
        type: string;
        size: string;
        uploadDate: string;
    };
}

const createMockImage = (id: number, name: string, url: string): MockImage => ({
    id: `img-${id}`,
    name,
    imageUrl: url,
    metadata: {
        type: 'image/webp',
        size: '1.2MB',
        uploadDate: new Date().toISOString()
    }
});

export const mockImages: Record<TabType, MockImage[]> = {
    identificacion: [
        createMockImage(1, "INE frontal", id1),
        createMockImage(2, "INE reverso", id2),
        createMockImage(3, "Selfie", id3)
    ],
    comprobante: [
        createMockImage(4, "Comprobante 1", co1),
        createMockImage(5, "Comprobante 2", co2),
        createMockImage(6, "Comprobante 3", co3)
    ],
    propiedad: [
        createMockImage(7, "Escritura 1", es1),
        createMockImage(8, "Escritura 2", es2),
        createMockImage(9, "Fachada", es3)
    ],
    contrato: [
        createMockImage(10, "Contrato página 1", cn1),
        createMockImage(11, "Contrato página 2", cn2),
        createMockImage(12, "Firma", cn3)
    ],
    contacto: [
        createMockImage(13, "Referencia 1", rf1),
        createMockImage(14, "Referencia 2", rf2),
        createMockImage(15, "Referencia 3", rf3)
    ],
    fotografia: [
        createMockImage(16, "Foto frontal", ft1),
        createMockImage(17, "Foto perfil", ft2),
        createMockImage(18, "Foto cuerpo completo", ft3)
    ]
};
